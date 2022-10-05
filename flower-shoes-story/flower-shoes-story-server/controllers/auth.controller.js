const jwt = require("jsonwebtoken");

const User = require("../models/User");
const userService = require("../services/user.service");

const { TYPE, NUMBER, MESSAGE } = require("../constants");

const cookieOptions = {
  path: "/",
  httpOnly: true,
  maxAge: NUMBER.ONEDAY,
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;

    const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY);

    let user = await userService.findUser(userInfo);
    let partner = null;

    if (!user) {
      user = await User.create(userInfo);
    }

    if (!user.couple) {
      partner = await userService.findPartner(userInfo.email);
    }

    if (!user.couple && partner) {
      user.partner_id = partner.email;
      partner.type === TYPE.SOLDIER ? user.type = TYPE.GOMSIN : user.type = TYPE.SOLDIER;

      await user.save();
    }

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      result: "success",
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ result: "success" });
};

exports.authorize = async (req, res, next) => {
  try {
    return res.status(200).json({
      result: "success",
      message: MESSAGE.AUTHORIZED,
      data: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
};
