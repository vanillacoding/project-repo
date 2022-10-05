const AppError = require("../utils/AppError");

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
}

function handleDuplicateErrorDB() {
  return new AppError("Duplication error", 400);
}

module.exports = (err, req, res, next) => {
  err.status = err.status || 500;

  let error = { ...err, message: err.message };

  if (err.name === "ValidationError") {
    error = handleValidationErrorDB();
  } else if (err.code === 11000) {
    error = handleDuplicateErrorDB(err);
  }

  if (!error.isOperational) {
    console.log(`❗️ ERROR: ${err}`);

    error.message = "Internal Server Error.";
  }

  res.status(error.status).json({
    ok: false,
    error: { message: error.message },
  });
};
