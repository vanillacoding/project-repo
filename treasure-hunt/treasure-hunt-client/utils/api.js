import * as Facebook from 'expo-facebook';
import axios from 'axios';
import { checkValidation } from '../utils';
import getEnvVars from '../environment';
const { FACEBOOK_APP_ID, API_URL } = getEnvVars();
import message from '../constants/message';

export const logInFacebook = async() => {
  try {
    await Facebook.initializeAsync(FACEBOOK_APP_ID);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['email'],
    });
    if (type !== 'success') return alert(message.invalidLogin);
    const response = await axios({
      method: 'post',
      url: `https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture`,
    });
    const { email, name } = response.data;
    const picture_url = response.data.picture.data.url;
    const payload = { email, name, picture_url };

    return axios({
      method: 'post',
      url: `${API_URL}/api/users/login`,
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });
  } catch (err) {
    alert(message.invalidLogin);
  }
};

export const getAuth = (token) => {
  return axios({
    method: 'post',
    url: `${API_URL}/api/users/auth`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};

export const fetchTreasures = (country, category, token) => {
  return axios({
    method: 'get',
    url: `${API_URL}/api/treasures?country=${country}&category=${category}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};

export const fetchSelectedTreasure = (id, token) => {
  return axios({
    method: 'get',
    url: `${API_URL}/api/treasures/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};

export const updateSelectedTreasure = (id, token) => {
  return axios({
    method: 'put',
    url: `${API_URL}/api/treasures/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};

export const onSaveTreasure = (category, country, name, description, uriList, markedLocation, expiration, token) => {
  if (!checkValidation(category, country, name, description, uriList, markedLocation)) return;
  const formdata = new FormData();
  uriList.forEach(uri => {
    const name = uri.split('Camera/')[1] || uri.split('ImagePicker/')[1] || uri.split('ImageManipulator/')[1];
    const locationPicture = { uri, name, type: 'multipart/form-data', };
    formdata.append('img', locationPicture);
  });
  formdata.append('country', country);
  formdata.append('category', category);
  formdata.append('name', name);
  formdata.append('expiration', expiration);
  formdata.append('latitude', markedLocation.latitude);
  formdata.append('longitude', markedLocation.longitude);
  formdata.append('description', description);
  formdata.append('is_hunting', false);

  return axios({
    method: 'post',
    url: `${API_URL}/api/treasures`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
    data: formdata,
  });
};

export const fetchMyInformations = (userId, token, information) => {
  return axios({
    method: 'get',
    url: `${API_URL}/api/users/${userId}/${information}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};

export const deleteSelectedTreasure = (id, token) => {
  return axios({
    method: 'delete',
    url: `${API_URL}/api/treasures/${id}`,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `Bearer ${token}`,
    },
  });
};
