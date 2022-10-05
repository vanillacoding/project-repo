import axios from 'axios';

export const setTokenToHeader = token => {
  if (token) {
    return axios.defaults.headers.common['x-access-token'] = token;
  }

  delete axios.defaults.headers.common['x-access-token'];
};
