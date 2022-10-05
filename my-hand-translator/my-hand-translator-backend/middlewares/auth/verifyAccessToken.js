const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2();

const createHttpError = require("../../utils/createHttpError");
const { LOGIN, SERVER } = require("../../constants/error");
const User = require("../../models/User");

const verifyAccessToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];

  oauth2Client.setCredentials({ access_token: accessToken });
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  oauth2.userinfo.get(async (err, { data: { email } }) => {
    if (err) {
      return next(createHttpError(500, SERVER.INTERNAL_ERROR));
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(401, LOGIN.UNAUTHORIZED_USER, 1007);
    }

    return next();
  });
};

module.exports = verifyAccessToken;
