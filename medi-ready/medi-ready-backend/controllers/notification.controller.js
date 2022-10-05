const createError = require("http-errors");

const { MESSAGE } = require("../constants");
const userService = require("../services/user.service");

exports.updatePushNotificationToken = async (req, res, next) => {
  try {
    const { user_id } = req.userInfo;
    const { notificationToken } = req.body;

    if (!notificationToken) {
      throw createError(500, MESSAGE.INVALID_PUSH_NOTIFICATION_TOKEN);
    }

    await userService.updateNotificationToken(user_id, notificationToken);

    res.status(200).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};
