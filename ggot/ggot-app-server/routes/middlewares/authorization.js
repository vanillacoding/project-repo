const jwt = require('jsonwebtoken');

const { errorMessage } = require('../../constants/errorMessage');

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, YOUR_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: errorMessage.invalidUser
      });
    }

    next();
  });
};

exports.verifyToken = verifyToken;
