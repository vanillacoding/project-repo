const jwt = require("jsonwebtoken");

exports.generateToken = async (uid) => {
  return jwt.sign(
    {
      uid,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.verifyToken = async (clientToken) => {
  if (!clientToken) {
    return;
  }

  return jwt.verify(clientToken, process.env.JWT_SECRET);
};
