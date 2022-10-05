const jwt = require('jsonwebtoken');
const RESPONSE = require('../constants/response');

const verifyToken = async (req, res, next) => {
  let token = req.get('authorization');

  if (req.baseUrl === '/payment') {
    const { authToken } = req.query;
    token = authToken;
  }

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userInfo = userInfo;

    next();
  } catch (error) {
    res.status(401).json({ result: RESPONSE.UNAUTHORIZED });
  }
};

module.exports = verifyToken;
