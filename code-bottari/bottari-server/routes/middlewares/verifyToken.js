const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { SECRET_KEY } = require("../../config/envConfig");

const {
  EXPIRED_TOKEN,
  INVALID_TOKEN,
} = require("../../constants/messages");

const {
  TOKEN_EXPIRED_ERROR,
  JSON_WEB_TOKEN_ERROR,
} = require("../../constants/errors");

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.auth;

  if (token === undefined) {
    next(createError(401, INVALID_TOKEN));

    return;
  }

  try {
    jwt.verify(token, SECRET_KEY);
  } catch (error) {
    const { name } = error;

    if (name === TOKEN_EXPIRED_ERROR) {
      next(createError(401, EXPIRED_TOKEN));

      return;
    }

    if (name === JSON_WEB_TOKEN_ERROR) {
      next(createError(401, INVALID_TOKEN));

      return;
    }
  }

  next();
};

module.exports = verifyToken;
