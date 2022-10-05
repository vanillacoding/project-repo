import * as Facebook from 'expo-facebook';
import axios from 'axios';

import getEnvVars from '../../environment.js';
import MESSAGE from '../constants/message';

const { REACT_NATIVE_FACEBOOK_APP_ID } = getEnvVars();

export const logInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({
      appId: REACT_NATIVE_FACEBOOK_APP_ID,
    });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email'],
    });

    if (type !== 'success') return alert(MESSAGE.FAILED_LOGIN);

    const { data } = await axios.post(
      `https://graph.facebook.com/me?access_token=${token}&fields=email`
    );

    return data;
  } catch (error) {
    alert(MESSAGE.INVALID_LOGIN);
  }
};
