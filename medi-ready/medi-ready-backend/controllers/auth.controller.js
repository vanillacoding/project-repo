const userService = require("../services/user.service");
const createError = require("http-errors");

const { encode } = require("../utils/jwt");
const { NUMBER, MESSAGE, USER_TYPE } = require("../constants");

const cookieOptions = {
  path: "/",
  httpOnly: true,
  maxAge: NUMBER.ONEDAY,
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    const user = await userService.findUser(userInfo);

    if (user) {
      const token = encode(user.dataValues);
      res.cookie("token", token, cookieOptions);

      return res.status(200).json({
        result: "success",
        data: user.dataValues,
      });
    }

    const newUser = await userService.createUser(userInfo);

    const token = encode(newUser.dataValues);
    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      result: "success",
      data: newUser.dataValues,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ result: "success", message: MESSAGE.LOGOUT_SUCCESS });
};

exports.authorize = async (req, res, next) => {
  const { user_type, user_id } = req.userInfo;

  try {
    if (user_type === USER_TYPE.PHARMACIST) {
      const pharmacyInformation = await userService.findPharmacistInfo(user_id);

      return res.status(200).json({
        result: "success",
        message: MESSAGE.AUTHORIZED,
        data: req.userInfo,
        pharmacyInformation,
      });
    }

    if (user_type === USER_TYPE.PATIENT) {
      return res.status(200).json({
        result: "success",
        message: MESSAGE.AUTHORIZED,
        data: req.userInfo,
      });
    }

    res.status(400).json({ message: MESSAGE.INVALID_USER_DATA });
  } catch (error) {
    next(error);
  }
};
