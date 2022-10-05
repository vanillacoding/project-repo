const { OAuth2Client } = require("google-auth-library");

const { GOOGLE_CLIENT_ID } = process.env;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async function verifyGoogleToken(token) {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
  });

  const payload = ticket.getPayload();

  return {
    email: payload.email,
    imageUrl: payload.picture,
    username: payload.name,
  };
};
