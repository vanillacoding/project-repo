import axios from 'axios';
import { getCookie } from 'cookies-next';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1500,
});

API.interceptors.request.use(
  req => {
    const loginData = getCookie('loginData');
    if (loginData) {
      req.headers.Authorization = `Bearer ${loginData}`;
    }

    return req;
  },
  error => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  res => {
    if (!res.data) {
      throw new Error('No data transferred');
    }

    return res.data;
  },
  error => {
    if (error.response) {
      const currentError = {
        result: error.response.data.result,
        ...error.response.data.error,
        error,
      };

      console.log('error : ', error);

      if (process.env.NODE_ENV === 'development') {
        console.error(currentError);
      } else {
        console.log({ result: 'error', statusCode: error.response.status });
      }

      throw currentError;
    }

    throw error;
  },
);

export default API;
