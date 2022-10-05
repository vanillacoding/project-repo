const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const { decode } = require("../../services/usersService");

const { SECRET_KEY } = require("../../config/envConfig");

const {
  UNEXPECTED_ERROR,
  INVALID_REQUEST,
  INVALID_TOKEN,
  NOT_FOUND,
  NO_AUTHORITY_TO_ACCESS,
  UNPROCESSABLE_ENTITY,
  OK,
} = require("../../constants/messages");

const {
  ADD,
  REMOVE,
} = require("../../constants/names");

const verifyUserData = async (req, res, next) => {
  const { authorization } = req.headers;
  const idToken = authorization.split(" ")[1];

  try {
    const email = await decode(idToken);

    const user = await User.findOne({ email });

    const userId = user?._id;

    if (userId) {
      const token = jwt.sign(String(userId), SECRET_KEY);

      res.cookie("auth", token, {
        maxAge: 1000 * 60 * 60, // hour = milliseconds * seconds * minutes
        httpOnly: true,
      });
    }

    res
      .status(200)
      .send({ result: OK, userId });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const registerUser = async (req, res, next) => {
  const { idToken, nickname, imageUrl } = req.body;

  try {
    const isInvalid = (idToken === undefined)
      || (nickname === undefined)
      || (imageUrl === undefined);

    if (isInvalid) {
      throw createError(422, INVALID_REQUEST);
    }

    const email = await decode(idToken);

    const user = await User.create({
      email,
      nickname,
      imageUrl,
    });

    const token = jwt.sign(user._id, SECRET_KEY);

    res
      .cookie("auth", token, {
        maxAge: 1000 * 60 * 60, // hour = milliseconds * seconds * minutes
        httpOnly: true,
      })
      .status(200)
      .send({ result: OK });
  } catch (error) {
    if (error.status) {
      next(error);
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const logout = (req, res, next) => {
  res
    .cookie("auth", "")
    .status(200)
    .send({ result: OK });
};

const getNotification = async (req, res, next) => {
  const token = req.cookies.auth;

  try {
    if (token === undefined) {
      throw createError(401, INVALID_TOKEN);
    }

    const userId = jwt.decode(token);

    const user = await User.findById(userId).populate("notificationList.user");
    const hasUserData = user !== null;

    if (!hasUserData) {
      throw createError(404, NOT_FOUND);
    }

    const { notificationList } = user;

    res
      .status(200)
      .send({ result: OK, notificationList });
  } catch (error) {
    next(error);
  }
};

const getFollowingUsers = async (req, res, next) => {
  const { id } = req.params;

  try {
    const followingList = await User.find({ followerList: { $all: [id] } });

    res
      .status(200)
      .send({ result: OK, followingList });
  } catch (error) {
    next(error);
  }
};

const handleFollowData = async (req, res, next) => {
  const { id: targetId } = req.params;
  const { taskType } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    if (targetId === userId) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    if (taskType === undefined) {
      throw createError(422, UNPROCESSABLE_ENTITY);
    }

    const targetUser = await User.findById(targetId);

    const hasUserData = targetUser !== null;

    if (!hasUserData) {
      throw createError(404, NOT_FOUND);
    }

    const { followerList } = targetUser;

    const hasUserId = followerList.includes(userId);

    if (taskType === ADD && !hasUserId) {
      followerList.push(userId);
    }

    if (taskType === REMOVE && hasUserId) {
      const index = followerList.findIndex((followerId) => String(followerId) === String(userId));

      followerList.splice(index, 1);
    }

    await targetUser.save();

    res
      .status(200)
      .send({ result: OK, followerNumber: followerList.length });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const getUserData = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res
      .status(200)
      .send({ result: OK, user });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const updateUserData = async (req, res, next) => {
  const { id: targetId } = req.params;
  const { nickname, imageUrl, theme } = req.body;
  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    if (targetId !== userId) {
      throw createError(403, NO_AUTHORITY_TO_ACCESS);
    }

    const isInvalid = nickname === undefined && imageUrl === undefined;

    if (isInvalid) {
      throw createError(422, INVALID_REQUEST);
    }

    const targets = {};

    nickname && (targets.nickname = nickname);
    imageUrl && (targets.imageUrl = imageUrl);
    theme && (targets.theme = theme);

    const updatedUserData = await User.findByIdAndUpdate(userId, targets, { new: true });

    res
      .status(200)
      .send({ result: OK, updatedUserData });
  } catch (error) {
    if (error.status) {
      next(error);

      return;
    }

    next({ message: UNEXPECTED_ERROR });
  }
};

const checkNotification = async (req, res, next) => {
  const { id } = req.body;

  const { auth: token } = req.cookies;

  const userId = jwt.decode(token);

  try {
    await User.updateOne({ _id: userId, "notificationList._id": id }, { $set: { "notificationList.$.isChecked": true } });

    res
      .status(200)
      .send({ result: OK });
  } catch (error) {
    next({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  verifyUserData,
  registerUser,
  logout,
  getNotification,
  getFollowingUsers,
  handleFollowData,
  getUserData,
  updateUserData,
  checkNotification,
};
