const { MESSAGE } = require("../constant");
const { Expo } = require("expo-server-sdk");

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

const schedulePushNotification = (token) => {
  const messages = [];
  const targetUser = [];

  targetUser.push(token);

  for (let pushToken of targetUser) {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Error(400);
    }

    messages.push({
      to: pushToken,
      sound: "default",
      body: MESSAGE.PUSH_NOTIFICATION_MESSAGE,
    });
  }

  const chunks = expo.chunkPushNotifications(messages);

  const sendPushNotifications = async () => {
    for (const chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        throw error;
      }
    }
  };

  sendPushNotifications();
};

module.exports = schedulePushNotification;
