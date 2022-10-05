const { validationResult } = require("express-validator");
const createError = require("http-errors");

const catchAsync = (fn) => async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(400, errors.array()[0].msg);
    }

    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = catchAsync;
