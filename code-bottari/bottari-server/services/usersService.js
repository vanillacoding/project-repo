const admin = require("firebase-admin");
const createError = require("http-errors");

const { EXPIRED_TOKEN } = require("../constants/messages");

const {
  AUTH_ID_TOKEN_REVOKED,
  AUTH_ID_TOKEN_EXPIRED,
} = require("../constants/errors");

const decode = async (idToken) => {
  try {
    const decodedToken = await admin
      .auth()
      .verifyIdToken(idToken, false);

    const { email } = decodedToken;

    return email;
  } catch (error) {
    const { code } = error;

    if (code === AUTH_ID_TOKEN_REVOKED) {
      throw createError(422, INVALID_TOKEN);
    }

    if (code === AUTH_ID_TOKEN_EXPIRED) {
      throw createError(401, EXPIRED_TOKEN);
    }
  };
};

module.exports = { decode };
