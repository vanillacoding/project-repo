const createError = require('http-errors');
const { authErrorMessage } = require('../constants/errorMessage');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const User = require('../models/User');


exports.signin = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email }).lean();

    if (!currentUser) {
      return next(createError(400, authErrorMessage.USER_NOT_EXIST));
    }

    const isCorrectPassword = await argon2.verify(currentUser.password, password);
    if (!isCorrectPassword) {
      return next(createError(403, authErrorMessage.WRONG_PASSWORD));
    }

    const appIdToken = jwt.sign(JSON.stringify(currentUser._id), secretKey);

    return res.json({
      code: 200,
      message: 'signin success',
      data: { currentUser, appIdToken }
    });
  } catch (err) {
    next(createError(500, authErrorMessage.SIGNIN_FAILED));
  }
};

exports.signup = async function (req, res, next) {
  try {
    const isUserExists = await User.checkUserExists(req.body.email);

    if (isUserExists) {
      return next(createError(409, authErrorMessage.USER_ALREADY_EXIST));
    }

    const { email, username, password, confirmPassword } = req.body;
    const hashedPassword = await argon2.hash(password);

    await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.json({
      code: 200,
      message: 'signup success',
    });
  } catch (err) {
    next(createError(500, authErrorMessage.SAVE_DATA_FAILED));
  }
};
