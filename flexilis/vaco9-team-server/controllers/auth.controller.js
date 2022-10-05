const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const Advertiser = require('../models/Advertiser');
const User = require('../models/User');
const UserByAge = require('../models/UserByAge');
const UserStats = require('../models/UserStats');
const { authErrorMessage } = require('../constants/controllerErrorMessage');
const { authResponseMessage } = require('../constants/responseMessage');
const { ACCESS_TOKEN_EXPIRATION_TIME } = require('../constants');

exports.register = async function (req, res, next) {
  try {
    const isExistAdvertiser = await Advertiser.checkIsAdvertiserExist(req.body);

    if (isExistAdvertiser) {
      return next(createError(400, authErrorMessage.ALREADY_EXIST_INFO_ERROR));
    }

    const {
      email,
      name,
      password,
      companyName,
      companyEmail,
      companyRegistrationNumber,
    } = req.body;
    const hashedPassword = await argon2.hash(password);

    await Advertiser.create({
      email,
      name,
      password: hashedPassword,
      companyName,
      companyEmail,
      companyRegistrationNumber,
    });

    res.json({
      code: 200,
      message: authResponseMessage.REGISTER_SUCCESS_RESPONSE,
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const currentAdvertiser = await Advertiser.findOne({ email }).lean();

    if (!currentAdvertiser) {
      return next(createError(400, authErrorMessage.NONEXISTENT_EMAIL_ERROR));
    }

    const isCorrectPassword = await argon2.verify(currentAdvertiser.password, password);

    if (!isCorrectPassword) {
      return next(createError(401, authErrorMessage.INCORRECT_PASSWORD_ERROR));
    }

    res.json({
      code: 200,
      message: authResponseMessage.LOGIN_SUCCESS_RESPONSE,
      data: {
        accessToken: jwt.sign(
          { id: currentAdvertiser._id },
          process.env.JWT_SECRET,
          { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
        ),
        user: {
          email: currentAdvertiser.email,
          name: currentAdvertiser.name,
          companyName: currentAdvertiser.companyName,
          companyEmail: currentAdvertiser.companyEmail,
        },
      },
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.registerUser = async function (req, res, next) {
  try {
    const isExistUser = await User.checkIsUserExist(req.body);

    if (isExistUser) {
      return next(createError(400), authErrorMessage.ALREADY_EXIST_EMAIL_ERROR);
    }

    const { email, password, name, age, gender, country } = req.body;
    const hashedPassword = await argon2.hash(password);

    await User.create({
      email,
      name,
      password: hashedPassword,
      age,
      gender,
      country,
    });

    await UserStats.findOneAndUpdate({
      country,
    }, {
      $inc: { countryUserCount: 1 }
    });
    await UserByAge.findOneAndUpdate({
      country,
      age,
      gender,
    }, {
      $inc: { userCount: 1 },
    });

    res.json({
      code: 200,
      message: authResponseMessage.REGISTER_SUCCESS_RESPONSE,
    });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.loginUser = async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const currentUser = await User.findOne({ email }).lean();

    if (!currentUser) {
      return next(createError(400), authErrorMessage.NONEXISTENT_EMAIL_ERROR);
    }

    const isCorrectPassword = await argon2.verify(currentUser.password, password);

    if (!isCorrectPassword) {
      return next(createError(401), authErrorMessage.INCORRECT_PASSWORD_ERROR);
    }

    res.json({
      code: 200,
      message: authResponseMessage.LOGIN_SUCCESS_RESPONSE,
      data: {
        accessToken: jwt.sign(
          { id: currentUser._id },
          process.env.JWT_SECRET,
          { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME }
        ),
        name: currentUser.name,
        paymentState: currentUser.paymentState,
      },
    });
  } catch (err) {
    next(createError(500, err));
  }
};
