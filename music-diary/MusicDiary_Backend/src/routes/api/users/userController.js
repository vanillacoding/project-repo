const SpotifyWebApi = require("spotify-web-api-node");

const { checkUserService, createUserService } = require("../../../services/userService");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

exports.getAuthUrl = async (req, res, next) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-library-modify",
    "user-library-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-read-recently-played",
    "user-top-read"
  ];

  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
  });

  const authorizeURL = await spotifyApi.createAuthorizeURL(scopes);

  return res.json({
    result: "ok",
    data: { authUrl: authorizeURL },
  });
};

exports.getAccessToken = async (req, res, next) => {
  try {
    const authCode = req.body.authCode;

    const spotifyApi = new SpotifyWebApi({ clientId, clientSecret, redirectUri });
    const { body } = await spotifyApi.authorizationCodeGrant(authCode);

    spotifyApi.setAccessToken(body["access_token"]);
    spotifyApi.setRefreshToken(body["refresh_token"]);

    return res.json({
      result: "ok",
      data: { accessToken: body.access_token },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const accessToken = req.accessToken;
    const spotifyApi = new SpotifyWebApi();

    spotifyApi.setAccessToken(accessToken);

    const { body } = await spotifyApi.getMe();

    const userInfo = {
      id: body.id,
      userName: body.display_name,
      email: body.email,
      externalUrl: body.external_urls.spotify,
      uri: body.uri,
    };

    const { existedUser, checkUserServiceError } = await checkUserService(userInfo.id);

    if (!existedUser) {
      const { newUser, createUserServiceError } = await createUserService(userInfo);
      return res.json({
        result: "ok",
        data: {
          userInfo: {
            id: newUser.id,
            userName: newUser.userName,
            email: newUser.email,
            externalUrl: newUser.externalUrl,
            uri: newUser.uri,
            privateDiaryList: newUser.privateDiaryList,
          },
        },
      });
    }

    return res.json({
      result: "ok",
      data: {
        userInfo: {
          id: existedUser.id,
          userName: existedUser.userName,
          email: existedUser.email,
          externalUrl: existedUser.externalUrl,
          uri: existedUser.uri,
          privateDiaryList: existedUser.privateDiaryList,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
