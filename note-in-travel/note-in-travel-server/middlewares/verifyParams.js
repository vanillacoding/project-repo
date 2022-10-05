const mongoose = require("mongoose");

const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
  const params = Object.values(req.params);
  const isInvalid = params.find((param) => !mongoose.isValidObjectId(param));

  if (isInvalid) {
    return next(new AppError("잘못된 파라미터입니다.", 404));
  }

  next();
};
