const createError = require("http-errors");
const { MESSAGE } = require("../constants");
const { decode } = require("../utils/jwt");
const userService = require("../services/user.service");

const verifyToken = async (req, res, next) => {
  if (!req.headers.cookie) {
    return res.status(200).json({ result: "fail" });
  }

  const token = req.headers.cookie.split("=")[1];

  try {
    if (!token) {
      throw createError(401, MESSAGE.UNAUTHORIZED_USER);
    }

    const userInfo = decode(token);
    const user = await userService.findUser(userInfo);

    if (user) {
      req.userInfo = userInfo;

      return next();
    }

    throw createError(401, MESSAGE.UNAUTHORIZED_USER);
  } catch (error) {
    next(error);
  }
};

exports.verifyToken = verifyToken;
