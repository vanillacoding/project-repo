const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const Document = require("../model/Document");

async function isUserEmailExist(email) {
  const user = await User.findOne({ email }).lean();

  return user;
}

module.exports.joinUser = async (req, res, next) => {
  const {
    body: {
      email,
      password,
      name
    }
  } = req;

  try {
    if (await isUserEmailExist(email)) return res.json({
      message: "이미 존재하는 E-mail입니다!"
    });

    await User.create({
      email,
      password: await argon2.hash(password),
      name
    });

    const newUser = await User.findOne({
      email
    }).lean();

    await Document.create({
      owner: newUser._id
    });

    res.json({
      message: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "예상치 못한 오류가 발생 했습니다!"
    });
  }
};

async function isPasswordValid(user, password) {
  return await argon2.verify(user.password, password);
}

module.exports.loginUser = async (req, res, next) => {
  const {
    body: { email, password }
  } = req;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user) return res.json({
      message: "이메일을 확인해주세요!",
      caused: "email"
    })

    const isPasswordOk = await isPasswordValid(user, password);

    if (!isPasswordOk) return res.json({
      message: "비밀번호를 확인해주세요!",
      caused: "password"
    });

    const accessToken = jwt.sign(
      {
        email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m"
      }
    );

    const refreshAuth = String(Math.random() * Math.pow(10, 16));

    await User.findByIdAndUpdate(user._id, { $set: { refreshAuth }});

    const refreshToken = jwt.sign(
      {
        email,
        refreshAuth
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      accessToken,
      refreshToken,
      message: null,
      caused: null,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "예상치 못한 오류가 발생 했습니다!"
    });
  }
}

module.exports.googleLogin = async (req, res, next) => {
  const {
    body: { email, name }
  } = req;

  try {
    const googleUser = await User.findOne({ email }).lean();

    if (!googleUser) {
      await User.create({
        email,
        name
      });
    }

    const user = await User.findOne({ email }).lean();

    const accessToken = jwt.sign(
      {
        email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m"
      }
    );

    const refreshAuth = String(Math.random() * Math.pow(10, 16));

    await User.findByIdAndUpdate(user._id, { $set: { refreshAuth }});

    const refreshToken = jwt.sign(
      {
        email,
        refreshAuth
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      accessToken,
      refreshToken,
      message: null,
      caused: null,
      email: user.email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "예상치 못한 오류가 발생 했습니다!"
    });
  }
}
