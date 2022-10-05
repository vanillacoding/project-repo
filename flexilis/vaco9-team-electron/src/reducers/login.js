import { login } from '../apis/index';
import { ipcRenderer } from 'electron';

const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
  return {
    type: LOGIN_PENDING,
  };
}

function loginSuccess(username) {
  return {
    type: LOGIN_SUCCESS,
    payload: username,
  };
}

function loginFail(message) {
  return {
    type: LOGIN_FAILURE,
    payload: message,
  };
}

export function fetchLogin(loginInput) {
  return async function (dispatch) {
    dispatch(requestLogin());

    try {
      const response = await login(loginInput);
      const { name, accessToken } = response.data.data;

      dispatch(loginSuccess({ name, accessToken }));
      ipcRenderer.send('storeUserData', loginInput);
      window.location.hash = '#/alarmRegister';
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  }
}

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  name: null,
  accessToken: '',
  isError: false,
  errorMessage: '',
}

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
        isFetching: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
}
