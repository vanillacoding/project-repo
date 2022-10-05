import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { DEVICE, WARNING, PERMISSION_RESULT } from "../constants/device";

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== PERMISSION_RESULT.GRANTED) {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== PERMISSION_RESULT.GRANTED) {
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

  } else {
    alert(WARNING.NOT_PHYSICAL_DEVICE);
  }

  if (Platform.OS === DEVICE.ANDROID) {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};
