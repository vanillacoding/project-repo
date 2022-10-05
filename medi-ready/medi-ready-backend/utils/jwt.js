const jwt = require("jsonwebtoken");

exports.encode = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

exports.decode = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
