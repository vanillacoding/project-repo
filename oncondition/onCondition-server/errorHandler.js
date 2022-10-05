const createError = require("http-errors");
const { ERROR } = require("./constants/messages");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./constants/statusCodes");

exports.handleNotFound = function (req, res, next) {
  next(createError(NOT_FOUND));
};

exports.handleDefaultError = function (
  err, req, res, next,
) {
  const message = (
    req.app.get("env") === "development"
    || err.status !== INTERNAL_SERVER_ERROR
  ) ? err.message
    : ERROR.INTERNAL_SERVER_ERROR;

  // render the error page
  res.status(err.status || INTERNAL_SERVER_ERROR);
  res.json({ error: message });
};
