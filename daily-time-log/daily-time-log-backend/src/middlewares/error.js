const mongoose = require("mongoose");
const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let error = err;

  if (err instanceof mongoose.Error) {
    error = createError(500, err);
  }

  res.status(error.status || 500);
  res.json({
    result: "failure",
    error,
  });
};

module.exports = {
  errorHandler,
};
