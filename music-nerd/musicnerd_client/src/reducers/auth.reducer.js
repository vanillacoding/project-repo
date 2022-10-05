import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_AUTH_ERROR,
} from '../constants/index';
import { setTokenToHeader } from '../lib/auth';

const initialState = {
  token: '',
  userId: '',
  hasSignedUp: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        hasSignedUp: true
      };

    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        hasSignedUp: false
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.token);
      setTokenToHeader(action.token);

      return {
        ...state,
        loading: false,
        token: action.token,
        userId: action.userId,
        isAuthenticated: true
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        token: '',
        isAuthenticated: false
      };

    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return {
        token: '',
        userId: '',
        hasSignedUp: false,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};
