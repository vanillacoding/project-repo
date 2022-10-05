const createError = require("http-errors");
const extractToken = require("../../utils/extractToken");
const { verifyAccessToken } = require("../../utils/jwtHelpers");

function authentication(req, res, next) {
  const authToken = extractToken(req);

  if (!authToken) {
    next(createError(401));
    return;
  }

  const verifiedResult = verifyAccessToken(authToken);

  if (!verifiedResult) {
    next(createError(401));
    return;
  }

  req.user = verifiedResult.user;
  next();
}

module.exports = authentication;
