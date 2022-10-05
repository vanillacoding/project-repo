const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ForbiddenError } = require('../lib/errors');

const authMiddleware = async (req, res, next) => {
  try {
    const secret = req.app.get('jwt-secret');
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) throw err;
    const bearerToken = bearerHeader.split(' ')[1];

    const decode = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(bearerToken, secret, (err, decoded) => {
          err ? reject(err) : resolve(decoded);
        });
      });
    };

    const userInfo = await decode();
    const userData = await User.findOneByFacebookId(userInfo.facebookId);
    res.locals.userData = userData;
    next();

  } catch(err) {
    const { name, message } = err;
    next(new ForbiddenError(name, message));
  }
}

module.exports = authMiddleware;
