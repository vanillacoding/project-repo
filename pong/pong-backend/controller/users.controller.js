const createError = require("http-errors");
const User = require("../models/User");

module.exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().sort({ winningPoint: -1 });

    res
      .status(200)
      .json(users);
  } catch (err) {
    next(createError(500, err.message));
  }
};
