const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const REGEX = require("../constants/validateCondition");
const ERROR = require("../constants/error");

exports.postAuthCheck = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!payload) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const { email } = payload;

    const user = await User.findOne({ email }, "username email").lean();

    if (!user) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    res.status(200).json({ result: "Success", user });
  } catch (err) {
    next(err);
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !passwordConfirm ||
      !REGEX.NAME.test(username) ||
      !REGEX.EMAIL.test(email) ||
      !REGEX.PASSWORD.test(password) ||
      !REGEX.PASSWORD.test(passwordConfirm) ||
      passwordConfirm !== password
    ) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const registeredUser = await User.findOne({ email });

    if (registeredUser) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    await User.create({ username, email, password });

    res.status(200).json({ result: "Success" });
  } catch (err) {
    next(err);
  }
};

exports.postLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.headers;

    if (!email || !password) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const user = await User.findOne(
      { email },
      "username email password",
    ).lean();

    if (!user) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return next(createError(400, ERROR.BAD_REQUEST));
    }

    const token = await jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    res.setHeader("token", token);
    res.status(200).json({ result: "Success", user });
  } catch (err) {
    next(err);
  }
};
