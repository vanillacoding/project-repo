import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  isAuthorized: false,
  user: null,
  authError: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
    case ACTION_TYPES.USER_LOGIN:
    case ACTION_TYPES.SOCIAL_LOGIN:
    case ACTION_TYPES.USER_SIGNUP:
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
    case ACTION_TYPES.USER_LOGIN_SUCCESS:
    case ACTION_TYPES.USER_SIGNUP_SUCCESS:
      copiedState.isAuthorized = true;
      copiedState.user = action.payload;
      return copiedState;

    case ACTION_TYPES.SOCIAL_LOGIN_SUCCESS:
      copiedState.isAuthorized = true;
      copiedState.user = action.payload;
      return copiedState;

    case ACTION_TYPES.CREATE_CRYPTOFOLIO_SUCCESS:
      copiedState.user?.cryptofolios.push(action.payload);
      return copiedState;

    case ACTION_TYPES.USER_LOGOUT:
    case ACTION_TYPES.CHECK_AUTHORIZATION_UNAUTH:
      copiedState.isAuthorized = false;
      copiedState.user = null;
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
    case ACTION_TYPES.USER_LOGIN_FAIL:
    case ACTION_TYPES.SOCIAL_LOGIN_FAIL:
    case ACTION_TYPES.USER_SIGNUP_FAIL:
      copiedState.isAuthorized = false;
      copiedState.user = null;
      copiedState.error = action.payload;
      if (action.payload.errMessage) {
        copiedState.authError = action.payload.errMessage;
      }
      return copiedState;

    case ACTION_TYPES.RESET_ERROR_MESSAGE:
      copiedState.authError = null;
      return copiedState;

    default:
      return copiedState;
  }
};

export default authReducer;
