const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs/index');
const { ERR_MSG } = require('../../constants/errors/errorMessage');

const {
  VliveError,
  JsonWebTokenError,
  TokenExpiredError,
} = require('../../lib/errors');

async function verifyToken(req, _, next) {
  try {
    if (req.headers.authorization == null) {
      throw new JsonWebTokenError();
    }

    const token = req.headers.authorization.split(' ')[1];

    await jwt.verify(token, tokenSecretKey);

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new TokenExpiredError());
    }

    if (err.name === 'JsonWebTokenError') {
      return next(new JsonWebTokenError());
    }

    next(new VliveError());
  }
}

module.exports = verifyToken;
