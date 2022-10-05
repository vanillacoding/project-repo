const AppError = require("../utils/AppError");

module.exports = (req, res, next) => {
  if (!req.user) {
    return next(new AppError("로그인이 필요합니다.", 401));
  }

  next();
};
