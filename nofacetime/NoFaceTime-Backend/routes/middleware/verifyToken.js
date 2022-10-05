const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../config/index');
const { TOKEN_MESSAGE } = require('../../utils/constants');

const verifyToken = (req, res, next) => {
  try {
    const { cookie } = req.headers;
    const token = cookie.split('=')[1];

    if (!token) {
      return res.status(401).send({
        code: 401,
        message: TOKEN_MESSAGE.NOT_EXIST,
      });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).send({
          code: 401,
          message: TOKEN_MESSAGE.INVALID
        });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = verifyToken;
