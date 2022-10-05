const UserService = require("../../services/user");

exports.updateUserName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    const { status, message, user } = await UserService.updateUserName(id, userName);

    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserThumnail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { thumnail } = req.body;
    const { status, message, user } = await UserService.updateUserThumnail(id, thumnail);

    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { term } = req.query;
    const { status, message, userList } = await UserService.searchUsers(term);

    res.status(status).json({
      message,
      payload: userList,
    });
  } catch (err) {
    next(err);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { targetID } = req.body;
    const { status, message, currentUser } = await UserService.followUser(id, targetID);

    res.status(status).json({
      message,
      payload: currentUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { targetID } = req.body;
    const { status, message, currentUser } = await UserService.unfollowUser(id, targetID);

    res.status(status).json({
      message,
      payload: currentUser,
    });
  } catch (err) {
    next(err);
  }
};
