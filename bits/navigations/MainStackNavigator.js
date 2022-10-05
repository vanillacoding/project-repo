import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { userSlice } from '../featrues/userSlice';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { STRINGS, COLORS, MESSAGE, PATTERN } from '../constants/index';

import AutchStackNavigator from './AuthStackNavigator';
import UserScreenNavigator from './UserScreenNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const MainStackNavigator = () => {
  const { isLogedIn } = useSelector(state => state.user);
  const { registerPushToken } = userSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    const subscribeNotification = async () => {
      try {
        const pushToken = await registerForPushNotificationsAsync();

        if (pushToken) {
          dispatch(registerPushToken({ pushToken }));
        }
      } catch(err) {
        console.log(err);
      }
    };

    subscribeNotification();
  }, [isLogedIn]);

  const registerForPushNotificationsAsync = async () => {
    let pushToken;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== STRINGS.GRANTED) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== STRINGS.GRANTED) {
        alert(MESSAGE.PUSH_TOKEN_FAIL);
        return;
      }

      pushToken = (await Notifications.getExpoPushTokenAsync()).data;

      return pushToken;
    } else {
      alert(MESSAGE.PUSH_TOKEN_ERR);
    }

    if (Platform.OS === STRINGS.ANDROID) {
      Notifications.setNotificationChannelAsync(STRINGS.DEFAULT, {
        name: STRINGS.DEFAULT,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [...PATTERN],
        lightColor: COLORS.ANDROID_LIGHT,
      });
    }
  };

  return (
    <>
      {isLogedIn
        ? <UserScreenNavigator />
        : <AutchStackNavigator />}
    </>
  );
};

export default MainStackNavigator;
