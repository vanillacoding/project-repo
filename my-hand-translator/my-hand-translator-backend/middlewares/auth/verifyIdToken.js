const HttpError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");

const User = require("../../models/User");
const createHttpError = require("../../utils/createHttpError");
const { LOGIN, SERVER } = require("../../constants/error");

const verifyIdToken = async (req, res, next) => {
  try {
    const { authorization, "client-id": clientId } = req.headers;
    const idToken = authorization.split(" ")[1];
    const oAuthClient = new OAuth2Client(clientId);

    try {
      const {
        payload: { email },
      } = await oAuthClient.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const user = await User.findOne({ email });

      if (!user) {
        throw createHttpError(401, LOGIN.UNAUTHORIZED_USER, 1007);
      }

      return next();
    } catch (error) {
      if (error instanceof HttpError) {
        return next(error);
      }

      return next(createHttpError(500, SERVER.INTERNAL_ERROR));
    }
  } catch (error) {
    return next(createHttpError(401, LOGIN.UNAUTHORIZED_USER, 1007));
  }
};

module.exports = { verifyIdToken };
