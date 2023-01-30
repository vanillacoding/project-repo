const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const ERROR = require("../constants/error");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET_KEY);

    next();
  } catch (err) {
    next(createError(401, ERROR.BAD_REQUEST));
  }
};
