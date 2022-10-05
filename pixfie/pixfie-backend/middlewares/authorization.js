const jwt = require('jsonwebtoken');

const User = require('../models/User');

const YOUR_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const validateId = async (req, res, next) => {
  try {
    const user = await User.findOne({ user_id: req.body.user_id });

    if (user) {
      return next({
        status: 409,
        message: "이미 존재하는 아이디입니다."
      });
    }

    next();
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    if (!token) {
      return next({
        status: 400,
        message: 'Bad Request'
      });
    }

    jwt.verify(token, YOUR_SECRET_KEY, error => {
      next(error ?{ status: 400, message: 'Bad Request' } : null);
    });

  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  };
};

module.exports = {
  validateId,
  verifyToken
};
