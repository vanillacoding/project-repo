import { authReducer } from '../auth.reducer';
import * as actions from '../../constants/index';

const initialState = {
  token: '',
  userId: '',
  hasSignedUp: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(initialState, {})).toEqual(initialState);
  });

  it('should set loading state to true when SIGNUP_REQUEST action dispatches.', () => {
    const signupRequestAction = { type: actions.SIGNUP_REQUEST };

    expect(authReducer(initialState, signupRequestAction)).toEqual({
      token: '',
      userId: '',
      hasSignedUp: false,
      isAuthenticated: false,
      loading: true,
      error: null
    });
  });

  it('should set loading to false and hasSignedUp to true when request success.', () => {
    const signupSuccessAction = { type: actions.SIGNUP_SUCCESS };

    expect(authReducer(initialState, signupSuccessAction)).toEqual({
      token: '',
      userId: '',
      hasSignedUp: true,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  });

  it('should set token and userId to state when login request success', () => {
    const token = 'fake token';
    const userId = 'fake userId';
    const loginSuccessAction = { type: actions.LOGIN_SUCCESS, token, userId };

    expect(authReducer(initialState, loginSuccessAction)).toEqual({
      token: 'fake token',
      userId: 'fake userId',
      hasSignedUp: false,
      isAuthenticated: true,
      loading: false,
      error: null
    });
  });

  it('should set all state to initialState when logout', () => {
    const logoutAction = { type: actions.LOGOUT };

    expect(authReducer(initialState, logoutAction)).toEqual({
      token: '',
      userId: '',
      hasSignedUp: false,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  });
});
