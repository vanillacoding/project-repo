const createError = require("http-errors");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const Music = require("../../models/Music");

const { jwtSecretKey, saltRound } = require("../../configs");

const localLogin = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(4)
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch {
    next(createError(400, "Joi Error"));
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ error: "Incorrect Email" });
      return;
    }

    const validate = await bcrypt.compareSync(password, user.password);

    if (!validate) {
      res
        .status(400)
        .json({ error: "Incorrect Password" });
      return;
    }

    const token = await jwt.sign({ email, _id: user._id }, jwtSecretKey, { expiresIn: "7d" });
    const expiresDate = new Date(Date.now() + 1 * 3600000);

    const profile = {
      _id: user._id,
      name: user.name,
      photoUrl: user.photoUrl,
      likeMusic: user.likeMusic,
      likeGenre: user.likeGenre,
      createdAt: user.createdAt,
      token,
    };

    res
      .status(200)
      .cookie("authorization", token, { expiresIn: expiresDate, httpOnly: false })
      .json({ result: "success", profile });
  } catch {
    next(createError(400, "Login Error"));
  }
};

const socialLogin = async (req, res, next) => {
  const { name, email } = req.body;
  let user = null;

  try {
    user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = await jwt.sign({ email, _id: user._id }, jwtSecretKey, { expiresIn: "7d" });
    const expiresDate = new Date(Date.now() + 1 * 3600000);

    const profile = {
      _id: user._id,
      name: user.name,
      photoUrl: user.photoUrl,
      likeMusic: user.likeMusic,
      likeGenre: user.likeGenre,
      createdAt: user.createdAt,
      token,
    };

    res
      .status(200)
      .cookie("user_token", token, { expiresIn: expiresDate, httpOnly: true })
      .json({ result: "success", profile });
  } catch {
    next(createError(400, "Login Error"));
  }
};

const refreshLogin = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    const token = await jwt.sign({ email: user.email, _id }, jwtSecretKey, { expiresIn: "7d" });
    const expiresDate = new Date(Date.now() + 1 * 3600000);

    const profile = {
      _id: user._id,
      name: user.name,
      photoUrl: user.photoUrl,
      likeMusic: user.likeMusic,
      likeGenre: user.likeGenre,
      createdAt: user.createdAt,
      token,
    };

    res
      .status(200)
      .cookie("user_token", token, { expiresIn: expiresDate, httpOnly: true })
      .json({ result: "success", profile });
  } catch {
    next(createError(400, "로그아웃 되었습니다."));
  }
};

const signup = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(4)
      .required(),
    checkPassword: Joi.string()
      .min(4)
      .required(),
  });

  try {
    await schema.validateAsync(req.body);
  } catch {
    next(createError(400, "Joi Error"));
    return;
  }

  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res
        .status(400)
        .json({ error: "exist email" });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRound);
    const hash = bcrypt.hashSync(password, salt);

    await User.create({
      name,
      email,
      password: hash,
    });

    res
      .status(201)
      .json({ result: "success" });
  } catch {
    next(createError(400));
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("authorization")
      .status(200)
      .json({ result: "success" });
  } catch {
    next(createError(400, "로그아웃에 실패했습니다."));
  }
};

const updateProfileName = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { name } = req.body;

    await User.findByIdAndUpdate(user_id, { name }, { new: true });

    res
      .status(201)
      .json({ result: "success", payload: name });
  } catch {
    next(createError(400, "프로필 이름 수정에 실패했습니다."));
  }
};

const updateProfilePhoto = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { location } = req.file;

    await User.findByIdAndUpdate(user_id, { photoUrl: location }, { new: true });

    res
      .status(201)
      .json({ result: "success", payload: location });
  } catch {
    next(createError(400, "프로필 사진 수정에 실패했습니다."));
  }
};

const updateLikeGenre = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { genres } = req.body;

    await User.findByIdAndUpdate(user_id, {
      $push: {
        likeGenre: {
          $each: genres,
        },
      },
    });

    res
      .status(201)
      .json({ result: "success", genres });
  } catch {
    next(createError(400, "좋아하는 장르 저장에 실패했습니다."));
  }
};

const updateLikeMusic = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { type, musicId } = req.body;
    let music = null;

    if (type === "like") {
      await User.findByIdAndUpdate(user_id, {
        $push: {
          likeMusic: { musicId, createdAt: new Date() },
        },
      });

      music = await Music.findByIdAndUpdate(musicId, {
        $push: {
          likeUser: { userId: user_id },
        },
      });
    }

    if (type === "dislike") {
      await User.findByIdAndUpdate(user_id, {
        $pull: {
          likeMusic: {
            musicId: {
              $eq: musicId,
            },
          },
        },
      });

      music = await Music.findByIdAndUpdate(musicId, {
        $pull: {
          likeUser: {
            userId: {
              $eq: user_id,
            },
          },
        },
      });
    }

    res
      .status(200)
      .json({ result: "success", music });
  } catch {
    next(createError(400, "좋아하는 음악 업데이트에 실패했습니다."));
  }
};

const getSampleUser = async (req, res, next) => {
  try {
    const { range } = req.query;

    const users = await User.aggregate([{
      $sample: {
        size: Number(range),
      },
    }]);

    res
      .status(200)
      .json({ result: "success", users });
  } catch (err) {
    next(createError(400, "유저 샘플 정보 받는데 실패했습니다."));
  }
};

module.exports = {
  localLogin,
  socialLogin,
  refreshLogin,
  signup,
  logout,
  updateProfileName,
  updateProfilePhoto,
  updateLikeGenre,
  updateLikeMusic,
  getSampleUser,
};
