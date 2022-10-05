const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../configs');

const { TokenExpiredError, InvalidTokenError } = require('../lib/errors');

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new InvalidTokenError();
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    await jwt.verify(token, tokenSecretKey);

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new TokenExpiredError());
    }

    next(new InvalidTokenError());
  }
};

module.exports = verifyToken;
