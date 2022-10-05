const jwt = require("jsonwebtoken");
const YOUR_SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const email = jwt.verify(token, YOUR_SECRET_KEY);

    req.userEmail = email;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = verifyToken;
