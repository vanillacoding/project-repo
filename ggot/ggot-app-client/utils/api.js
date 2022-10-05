import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from './axios';
import { SUCCESS, LOGIN_DATA } from '../constants/index';
import {
  getUserLogin,
  deleteSelectedPhotos
} from '../actions/index';

export const getLogIn = async (dispatch, email, photoUrl) => {
  try {
    const response = await axios.post('/user/login', {
      email: email,
      profileUrl: photoUrl
    });

    const { result, token, ggotUser } = response.data;

    if (result === SUCCESS) {
      const loginData = {
        TOKEN: token,
        USER: ggotUser
      };

      await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(loginData));

      dispatch(getUserLogin(ggotUser));

      axios.defaults.headers.common['Authorization'] = token;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const createNewPhoto = async (userId, photoInfo, photoUrlList, dispatch, openModal) => {
  const { latitude, longitude } = photoInfo.location;
  const { resistered_by, published_at, description } = photoInfo;

  const formdata = new FormData();

  photoUrlList.forEach((item) => {
    const name = `${userId}${item.fileName.split('.')[0]}`;
    const uri = item.uri;

    const photoProperties = { uri, name, type: 'image/jpg' };

    formdata.append('image', photoProperties);
  });

  formdata.append('latitude', latitude);
  formdata.append('longitude', longitude);
  formdata.append('description', description);
  formdata.append('published_at', published_at);
  formdata.append('resistered_by', resistered_by);

  try {
    const response = await axios.post(`/users/${userId}/photos`,
    formdata,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });

    const { result } = response.data;

    if (result === SUCCESS) {
      openModal();
      dispatch(deleteSelectedPhotos());
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getPhotosByLocation = async (coords, pageNumber) => {
  try {
    const response = await axios.get(`/photo/location?latitude=${coords.latitude}&longitude=${coords.longitude}`, {
      params: {
        page: pageNumber,
        limit: 15
      }
    });

    return response.data;
  } catch (err) {
    console.warn(err);
  }
};

export const getPhotosByUserId = async (user_Id, pageNumber) => {
  try {
    const response = await axios.get(`users/${user_Id}/photos`, {
      params: {
        page: pageNumber,
        limit: 15
      }
    });

    return response.data;
  } catch (err) {
    console.warn(err);
  }
};

export const getDistanceFromLatLngInMeter = (lat1, lng1, lat2, lng2) => {
  function deg2rad(deg) {

    return deg * (Math.PI/180);
  }

  const R = 6371;
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = deg2rad(lng2-lng1);

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;

  return d * 1000;
};
