const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const userService = require("../services/user.service");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.cookie) {
      return res.status(200).json({ result: "fail" });
    }

    const token = req.headers.cookie.split("=")[1];

    if (!token) {
      throw createError(401, MESSAGE.UNAUTHORIZED_USER);
    }

    const userInfo = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userService.findUser(userInfo);

    if (user) {
      req.userInfo = user;

      return next();
    }
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = verifyToken;
