import { baseURL } from './index';
import axios from 'axios';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token) {
      config.headers['Authorization'] = `bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
