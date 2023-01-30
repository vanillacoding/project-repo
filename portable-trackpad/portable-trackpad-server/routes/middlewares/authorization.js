const createError = require("http-errors");
const ERROR = require("../../constants/error");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.idtoken) {
    next(createError(401, ERROR.UNAUTHORIZED_USER));
  }

  next();
};
