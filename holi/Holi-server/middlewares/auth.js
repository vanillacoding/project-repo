const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../lib/errors');

const auth = async (req, res, next) => {
  try {
    const secret = req.app.get('jwt-secret');
    const header = req.headers.authorization;

    if (!header) throw err;
    const token = header.split(' ')[1];

    await decode();

    function decode() {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
          err ? reject(err) : resolve(decoded);
        });
      });
    }

    next();
  } catch (err) {
    next(new AuthenticationError());
  }
};

module.exports = auth;
