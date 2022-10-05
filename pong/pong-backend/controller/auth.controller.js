const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");

module.exports.login = async (req, res, next) => {
  try {
    const { email, name } = req.body;

    const currentUser = await User.findOne({ email });
    if (!currentUser) await User.create(req.body);

    const token = jwt.sign({
      email,
      name
    }, process.env.JWT_SECRET);

    res
      .cookie("authToken", token)
      .status(201)
      .json({
        result: "success",
        message: "로그인에 성공했습니다.",
        token,
      });
  } catch (err) {
    next(createError(500, "로그인에 실패했습니다."));
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res
      .clearCookie("authToken")
      .status(200)
      .json({ result: "success" });
  } catch (err) {
    next(createError(500, "로그아웃에 실패했습니다."));
  }
}
