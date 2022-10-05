const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const {
  ISSUER, ACCESS_DURATION, REFRESH_DURATION,
} = require("../../config/tokenInfos");
const { ONE_SECOND_IN_MS } = require("../../constants/times");
const { ERROR } = require("../../constants/messages");
const { UNAUTHORIZED } = require("../../constants/statusCodes");
const { TokenExpiredError, JsonWebTokenError } = jwt;

const BEARER = "Bearer ";

function generateToken(userId, isRefreshToken = false) {
  const secret = isRefreshToken
    ? process.env.REFRESH_TOKEN_SECRET
    : process.env.ACCESS_TOKEN_SECRET;
  const duration = isRefreshToken ? REFRESH_DURATION : ACCESS_DURATION;
  const nowInSecond = Math.floor(Date.now() / ONE_SECOND_IN_MS);
  const exp = nowInSecond + duration;
  const token = jwt.sign({ userId, exp }, secret, { issuer: ISSUER });

  return { token, exp };
}

function verifyToken(token, isRefreshToken = false) {
  const secret = isRefreshToken
    ? process.env.REFRESH_TOKEN_SECRET
    : process.env.ACCESS_TOKEN_SECRET;

  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw createError(UNAUTHORIZED, ERROR.TOKEN_EXPIRED);
    }

    if (err instanceof JsonWebTokenError) {
      throw createError(UNAUTHORIZED, ERROR.INVALID_TOKEN);
    }

    throw createError(UNAUTHORIZED, ERROR.REQUIRE_LOGIN);
  }
}

function parseBearer(authorization) {
  if (!authorization) {
    return null;
  }

  if (authorization.startsWith(BEARER)) {
    return authorization.slice(BEARER.length);
  }

  return null;
}

module.exports = { generateToken, verifyToken, parseBearer };
