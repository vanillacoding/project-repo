const jwt = require('jsonwebtoken');

exports.decode = token => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET_KEY
  );
};

exports.encode = user => {
  return jwt.sign(
    JSON.stringify(user),
    process.env.JWT_SECRET_KEY
  );
};
