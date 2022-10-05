import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import {
  ALERT_FAIL_NOTIFICATION,
  ALERT_USE_PHYSICAL_DEVICE,
  NOTIFICATION_TITLE,
  NOTIFICATION_MESSAGE
} from '../constants/index';

export default NotificationConfig = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert(ALERT_FAIL_NOTIFICATION);

      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert(ALERT_USE_PHYSICAL_DEVICE);
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: 'yellow'
    });
  }

  return token;
};

export const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_MESSAGE,
      data: { data: 'goes' }
    },
    trigger: { seconds: 2 }
  });
};
