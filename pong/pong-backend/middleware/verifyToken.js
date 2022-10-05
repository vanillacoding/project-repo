const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies["authToken"];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken.email});

    if (user) return next();

    res
      .status(204)
      .json({
        result: "failure",
        message: "user not found",
      });
  } catch (err) {
    next(createError(500, err.message));
  }
};
