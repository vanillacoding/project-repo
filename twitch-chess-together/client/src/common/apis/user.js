import axios from 'axios';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export const fetchUserData = async () => {
  const config = {
    method: 'get',
    url: `${SERVER_ADDRESS}/login/`,
    withCredentials: true,
  };
  const response = await axios(config);
  return response;
};

export const ejectUserData = () => {
  const config = {
    method: 'get',
    url: `${SERVER_ADDRESS}/login/out`,
    withCredentials: true,
  };

  axios(config);
};
