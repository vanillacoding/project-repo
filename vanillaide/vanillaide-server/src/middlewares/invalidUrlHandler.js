const createError = require("http-errors");

const ERROR = require("../constants/error");

module.exports = (req, res, next) => {
  next(createError(404, ERROR.INVALID_URL));
};
