import axios from 'axios';
import getEnvVars from '../../environment';
import asyncStorage from '@react-native-async-storage/async-storage';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

const defaultOptions = {
  baseURL: REACT_NATIVE_ANDROID_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(async config => {
  const token = await asyncStorage.getItem('token');
  config.headers.Authorization = token;

  return config;
});

export default axiosInstance;
