const jwt = require("jsonwebtoken");
const User = require("../models/User");

const catchAsync = require("../utils/catchAsync");

function handleInvalidToken(req, next) {
  req.user = null;
  return next();
}

module.exports = catchAsync(async (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    return handleInvalidToken(req, next);
  }

  const token = authorization.split("bearer ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return handleInvalidToken(req, next);
  }

  req.user = user;
  next();
});
