const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { tokenSecretKey } = require('../../configs');
const { MESSAGE, RESULT_OK } = require('../../configs/constants');

const User = require('../../models/User');

const googleLogin = async (req, res, next) => {
  const user = req.body;
  const { email, name, photoUrl } = user;

  if (!user) return next(createError(400));

  try {
    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      const newUser = await User.create({
        email,
        name,
        photoUrl,
      });

      const token = jwt.sign(
        {
          _id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          photoUrl: newUser.photoUrl,
        },
        tokenSecretKey,
      );

      return res.status(201).json({ ...RESULT_OK, token, user: newUser });
    }

    targetUser.isOnline = true;
    await targetUser.save();

    const token = jwt.sign(
      {
        _id: targetUser._id,
        email: targetUser.email,
        name: targetUser.name,
        photoUrl: targetUser.photoUrl,
      },
      tokenSecretKey,
    );

    res.status(200).json({ ...RESULT_OK, token, user: targetUser });
  } catch (err) {
    next(err);
  }
};

const tokenLogin = (req, res, next) => {
  const { token } = req.body;

  if (!token) return next(createError(400));

  try {
    const decodedUser = jwt.verify(token, tokenSecretKey);
    res.status(200).json({ ...RESULT_OK, token, user: decodedUser });
  } catch (err) {
    next(createError(401));
  }
};

const logoutUser = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const currentUser = await User.findById(user_id);

    currentUser.isOnline = false;
    await currentUser.save();

    res.status(200).json({ ...RESULT_OK });
  } catch (err) {
    next(err);
  }
};

const getFriendList = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id).populate('friendList');
    res.status(200).json({ ...RESULT_OK, friendList: user.friendList });
  } catch (err) {
    next(err);
  }
};

const getFriendRequestList = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await User.findById(user_id).populate('friendRequestList');
    res.status(200).json({ ...RESULT_OK, friendRequestList: user.friendRequestList });
  } catch (err) {
    next(err);
  }
};

const requestFriend = async (req, res, next) => {
  const { user_id } = req.params;
  const targetUserEmail = req.body.email;

  try {
    const targetUser = await User.findOne({ email: targetUserEmail });
    const user = await User.findById(user_id);

    if (!targetUser) {
      return next(createError(400, MESSAGE.FRIEND_REQUEST.NOT_EXIST));
    }

    if (targetUser.friendList.includes(user_id)) {
      return next(
        createError(400, MESSAGE.FRIEND_REQUEST.ALREADY_FRIEND(targetUser.name)),
      );
    }

    if (targetUserEmail === user.email) {
      return next(createError(400, MESSAGE.FRIEND_REQUEST.TO_ME));
    }

    const addedUser = targetUser.friendRequestList.addToSet(user_id);

    if (!addedUser.length) {
      return next(
        createError(400, MESSAGE.FRIEND_REQUEST.ALREADY_REQUESTED(targetUser.name)),
      );
    }

    await targetUser.save();

    res.status(200).json({ message: MESSAGE.FRIEND_REQUEST.SUCCESS(targetUser.name) });
  } catch (err) {
    next(err);
  }
};

const responseFriendRequest = async (req, res, next) => {
  const { user_id } = req.params;
  const { isAccepted, target_user_id } = req.body;

  try {
    const user = await User.findById(user_id);
    const targetUser = await User.findById(target_user_id);

    if (isAccepted) {
      user.friendList.push(target_user_id);
      targetUser.friendList.push(user_id);

      await targetUser.save();
    }

    user.friendRequestList.pull(target_user_id);
    await user.save();
    await user.execPopulate('friendRequestList');

    res.status(200).json({ ...RESULT_OK, friendRequestList: user.friendRequestList });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  googleLogin,
  tokenLogin,
  getFriendList,
  logoutUser,
  getFriendRequestList,
  requestFriend,
  responseFriendRequest,
};
