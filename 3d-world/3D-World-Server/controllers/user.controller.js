const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User");
const { validateName, validateAsyncEmail } = require("../utils/validation");
const {
  createRequestError,
  createAuthenticationError,
  createNotFoundError,
} = require("../utils/errors");

async function postLogin(req, res, next) {
  try {
    const { email, photoURL } = req.body;
    let { name } = req.body;

    await validateAsyncEmail(email);

    const nameValidationResult = validateName(name);

    if (nameValidationResult.error) {
      name = "VACODER";
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, photoURL });
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3h" },
    );

    const populated = await user.populate("friends").execPopulate();

    res.cookie("authorization", `bearer ${accessToken}`, { secure: true });
    res.json({ ok: true, data: populated });
  } catch (err) {
    if (err.details && err.details[0].type === "string.email") {
      next(createRequestError("Email is invalid."));
      return;
    }

    console.log("💥 postLogin");
    next(err);
  }
}

async function getUserByToken(req, res, next) {
  const { user } = req;

  if (!user) {
    next(createAuthenticationError("Unauthorized user"));
    return;
  }

  res.json({ ok: true, data: user });
}

// TODO: req.body의 data validation 필요
async function updateUser(req, res, next) {
  const { _id } = req.user;
  const {
    description,
    photoURL,
    musicURL,
    friend,
  } = req.body;
  let { name } = req.body;
  let newUser = {};

  if (!req.user) {
    next(createAuthenticationError("Unauthorized user"));
    return;
  }

  // TODO: case별 error handling 필요한 경우 추가
  try {
    if (friend) {
      const addFriend = { $push: { friends: friend } };

      newUser = await User.findByIdAndUpdate(_id, addFriend, { new: true });
      const populatedUser = await newUser.populate("friends").execPopulate();

      res.json({ ok: true, data: populatedUser });
      return;
    }

    const nameValidationResult = validateName(name);

    if (nameValidationResult.error) {
      name = "alphabet or number name";
    }

    const updateInfo = {
      $set: {
        name,
        description,
        photoURL,
        musicURL,
      },
    };

    newUser = await User.findByIdAndUpdate(_id, updateInfo, { new: true });
    const populatedUser = await newUser.populate("friends").execPopulate();

    res.json({ ok: true, data: populatedUser });
  } catch (err) {
    console.log("💥 updateUser");
    next(err);
  }
}

async function deleteUser(req, res, next) {
  const { user } = req;

  if (!user) {
    next(createAuthenticationError("Unauthorized user"));
    return;
  }

  try {
    await User.deleteOne({ _id: user._id });

    res.json({ ok: true, data: user });
  } catch (err) {
    console.log("💥 deleteUser");
    next(err);
  }
}

function logoutUser(req, res, next) {
  res.clearCookie("authorization");
  res.json({ ok: true, data: "Cleared Cookie" });
}

async function getUserById(req, res, next) {
  const { id } = req.params;

  if (!(mongoose.Types.ObjectId.isValid(id))) {
    next(createNotFoundError());
    return;
  }

  try {
    const user = await User.findById(id)?.lean();

    if (!user) {
      // NOTE: 404 not found를 띄울지는 client에서 결정하는 것이므로, 서버에서는 id가 없다는 정보를 주면 될까?
      next(createRequestError());
      return;
    }

    res.json({ ok: true, data: user });
  } catch (err) {
    console.log("💥 getUserById");
    next(err);
  }
}

// TODO: ADD error handle
async function getRandomUserIds(req, res, next) {
  const { size } = req.query;

  try {
    const users = await User.aggregate([{ $sample: { size: Number(size) } }]);

    res.json({ ok: true, data: users });
  } catch (err) {
    console.log("💥 getRandomUserIds");
    next(err);
  }
}

exports.postLogin = postLogin;
exports.getUserByToken = getUserByToken;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.logoutUser = logoutUser;
exports.getUserById = getUserById;
exports.getRandomUserIds = getRandomUserIds;
