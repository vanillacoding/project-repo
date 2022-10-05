import { requestLoginToServer } from '../apis/login';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';

const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

const succeedToLogin = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const failToLogin = (message) => ({
  type: LOGIN_FAILURE,
  payload: message,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginToAdminPage = (loginInput, history) => async (dispatch) => {
  dispatch(requestLogin());
  try {
    const response = await requestLoginToServer(loginInput);
    const body = await response.json();

    const {
      accessToken,
      user,
    } = body.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(succeedToLogin(user));

    history.push('/main');
  } catch (error) {
    dispatch(failToLogin());
  }
};

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user || null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...action.payload,
      };
    }
    case LOGIN_FAILURE:
    case LOGOUT: {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

      return null;
    }
    default: {
      return state;
    }
  }
}
