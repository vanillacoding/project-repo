const User = require("../../models/userModel");
const { createToken, verifyToken } = require("../../utils/tokenHandler");

exports.checkAuthDB = async (req, res, next) => {
  try {
    const user = await verifyToken(req.body.token);

    if (!user) {
      return res.status(200).json({
        message: "unauthorized",
      });
    }

    delete user.password;

    return res.status(200).json({
      message: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.loginDB = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("cryptofolios");

    if (!user) {
      return res.status(200).json({
        message: "fail",
        data: {
          errMessage: "사용자가 없습니다.",
        },
      });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(200).json({
          message: "fail",
          data: {
            errMessage: "잘못된 비밀번호입니다.",
          },
        });
      }

      const token = createToken(user._id);

      delete user.password;

      return res.status(200).json({
        message: "success",
        data: {
          user,
          token,
        },
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.socialLoginDB = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    let user = await User.findOne({ email }).populate("cryptofolios").lean();

    if (!user) {
      user = new User({
        email,
        name,
      });

      await user.save();
    }

    const token = createToken(user._id);

    delete user.password;

    return res.status(200).json({
      message: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.signupDB = async (req, res, next) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(200).json({
        message: "fail",
        data: {
          errMessage: "존재하는 이메일입니다.",
        },
      });
    }

    const user = new User(req.body);
    await user.save();

    const token = createToken(user._id);

    delete user.password;

    return res.status(200).json({
      message: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
