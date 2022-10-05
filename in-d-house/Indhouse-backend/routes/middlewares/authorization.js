const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { jwtSecretKey } = require("../../configs");

const verifyToken = (req, _, next) => {
  try {
    const { user_id } = req.params;
    const token = req.headers.authorization;

    const decodedUser = jwt.verify(token, jwtSecretKey);
    if (decodedUser._id !== user_id) return next(createError(403));

    next();
  } catch {
    next(createError(401));
  }
};

module.exports = verifyToken;
