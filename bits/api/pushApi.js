import { ROUTES } from '../constants/index';

/**
 * Notify to sned push notification
 * @param {String} expoPushToken - user's push expo push token
 * @param {String} bodyMessage - message's to send to target user
 */

export const sendPushNotification = async (expoPushToken, bodyMessage) => {

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Bits',
    body: bodyMessage
  };

  await fetch(ROUTES.PUSH_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
