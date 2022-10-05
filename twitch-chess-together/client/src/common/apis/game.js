import axios from 'axios';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export const createGameData = async (gameInfo) => {
  const config = {
    method: 'post',
    url: `${SERVER_ADDRESS}/game/new`,
    data: { gameInfo },
    withCredentials: true,
  };
  const response = await axios(config);
  return response;
};

export const getGameData = async (gameId) => {
  const config = {
    method: 'get',
    url: `${SERVER_ADDRESS}/game/${gameId}`,
  };
  const response = await axios(config);
  return response;
};

export const joinGame = async ({ userProfile, gameId }) => {
  const config = {
    method: 'post',
    url: `${SERVER_ADDRESS}/game/join`,
    data: { userProfile, gameId },
  };

  const response = await axios(config);
  return response;
};
