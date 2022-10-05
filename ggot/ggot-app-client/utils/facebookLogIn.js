import * as Facebook from 'expo-facebook';
import axios from 'axios';

import getEnvVars from '../environment';
import { getLogIn } from './api';
import { ALERT_FACEBOOK_LOGIN_ERROR } from '../constants/index';

const { FACEBOOK_APP_ID } = getEnvVars();

export const signInFacebook = async dispatch => {
  try {
    await Facebook.initializeAsync({
      appId: FACEBOOK_APP_ID
    });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email']
    });

    if (type !== 'success') return alert(ALERT_FACEBOOK_LOGIN_ERROR);

    const { data } = await axios.post(`https://graph.facebook.com/me?access_token=${token}&fields=email`);
    const { id, email } = data;
    const profilePicUrl = `https://graph.facebook.com/${id}/picture?type=large`;

    return getLogIn(dispatch, email, profilePicUrl);
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
