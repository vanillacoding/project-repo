const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { RES_RESULT, RES_MESSAGE } = require('../constants');

const verify = promisify(jwt.verify);
const { SECRET_TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401);
    res.json({ result: RES_RESULT.FAIL, message: RES_MESSAGE.UNAUTHORIZED });
    return;
  }

  const decoded = await verify(token, SECRET_TOKEN_KEY);
  res.locals.user = decoded;
  next();
};

module.exports = verifyToken;
