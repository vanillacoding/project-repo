import axios from 'axios';
import history from '../lib/history';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_AUTH_ERROR
} from '../constants/index';

export const requestSignup = dispatch => async user => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/signup`, user);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGNUP_FAILED, error: err.response.data.errorMessage });
  }
};

export const requestLogin = dispatch => async user => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/login`, user);
    const { token, userId } = response.data;

    dispatch({ type: LOGIN_SUCCESS, token, userId });
  } catch (err) {
    dispatch({ type: LOGIN_FAILED, error: err.response.data.errorMessage });
  }
};

export const logout = dispatch => () => {
  history.push('/');
  dispatch({ type: LOGOUT });
};

export const clearError = dispatch => () => {
  dispatch({ type: CLEAR_AUTH_ERROR });
};
