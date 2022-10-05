const HttpError = require("http-errors");

function createHttpError(statusCode, message, errorCode) {
  const error = new HttpError(statusCode);

  error.result = "error";
  error.error = {
    message,
    code: errorCode,
  };

  return error;
}

module.exports = createHttpError;
