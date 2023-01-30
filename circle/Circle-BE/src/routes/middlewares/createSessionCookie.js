const createError = require("http-errors");
const { admin } = require("../../../config/firebase.config");

const logger = require("../../../libs/logger");
const { MESSAGE, DEFAULT_COOKIE_DURATION } = require("../../constants");

const { UNAUTHORIZED } = MESSAGE;

const createSessionCookie = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];

    if (!token) {
      return next(createError(401, UNAUTHORIZED));
    }

    const expiresIn = DEFAULT_COOKIE_DURATION;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(token, { expiresIn });

    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    res.cookie("session", sessionCookie, options);

    return next();
  } catch (error) {
    logger.error(error.toString());

    return next(error);
  }
};

module.exports = createSessionCookie;
