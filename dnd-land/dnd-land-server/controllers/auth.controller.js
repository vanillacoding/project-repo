const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/User");
const { message, expiration } = require("../constants");

exports.login = async function (req, res, next) {
  try {
    const { email, name } = req.body;
    const currentUser = await User.findOne({ email });

    if (currentUser) {
      res.json({
        code: 200,
        message: message.SUCCESS,
        data: {
          accessToken: jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET, {
            expiresIn: expiration.ONE_WEEK,
          }),
          user: currentUser,
        },
      });
    } else {
      const newUser = await User.create({
        email,
        name,
      });

      res.json({
        code: 200,
        message: message.SUCCESS,
        data: {
          accessToken: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: expiration.ONE_WEEK,
          }),
          user: newUser,
        },
      });
    }
  } catch (err) {
    next(createError(500, err));
  }
};
