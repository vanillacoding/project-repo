import * as types from '../constants/actionTypes';

const authInitState = {
  isAuthenticated: false,
  jwtoken: null
};

const authReducer = (state = authInitState, action) => {
  switch (action.type) {
    case (types.LOGIN_USER):
      return {
        isAuthenticated: true,
        jwtoken: action.jwtoken
      };
    case (types.LOGOUT_USER):
      return {
        isAuthenticated: false,
        jwtoken: null
      };
    default:
      return state;
  }
};

export default authReducer;
