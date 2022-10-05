const createError = require("http-errors");
const User = require("../models/User");

module.exports.patch = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    currentUser.winningPoint += 10;

    await currentUser.save();

    res
      .status(200)
      .json({
        result: "success",
      });
  } catch (err) {
    next(createError(500, err.message));
  }
};
