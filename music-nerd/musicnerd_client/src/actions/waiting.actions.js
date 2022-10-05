import axios from 'axios';
import history from '../lib/history';
import {
  GET_GAMES_REQUEST,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILED,
  JOIN_GAME_REQUEST,
  JOIN_GAME_SUCCESS,
  JOIN_GAME_FAILED,
  CLAER_CREATE_GAME_ERROR
} from '../constants/index';

export const getGames = dispatch => async () => {
  try {
    dispatch({ type: GET_GAMES_REQUEST });

    const { data: { gameList } } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/waiting`);
    dispatch({ type: GET_GAMES_SUCCESS, gameList });
  } catch (err) {
    dispatch({ type: GET_GAMES_FAILURE, error: err.response.data.errorMessage });
  }
};

export const createGame = dispatch => async (userId, gameTitle) => {
  try {
    dispatch({ type: CREATE_GAME_REQUEST, userId, gameTitle });

    const { data: { gameId } } = await axios.post(`${process.env.REACT_APP_SERVER_URI}/waiting`, {
      userId,
      gameTitle
    });

    dispatch({ type: CREATE_GAME_SUCCESS, gameId });
    return history.push(`/games/${gameId}`);
  } catch (err) {
    dispatch({ type: CREATE_GAME_FAILED, error: err.response.data.errorMessage });
  }
};

export const enterGame = dispatch => async gameId => {
  try {
    dispatch({ type: JOIN_GAME_REQUEST });

    await axios.put(`${process.env.REACT_APP_SERVER_URI}/waiting`, { gameId });

    dispatch({ type: JOIN_GAME_SUCCESS, gameId });
    return history.push(`/games/${gameId}`);
  } catch (err) {
    dispatch({ type: JOIN_GAME_FAILED, error: err.response.data.errorMessage });
  }
};

export const clearCreateGameError = dispatch => () => {
  dispatch({ type: CLAER_CREATE_GAME_ERROR });
};
