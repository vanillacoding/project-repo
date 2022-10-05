import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  err: null,
};

const auth = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.AUTHORIZATION_SUCCESS:
    case actionTypes.LOG_IN_SUCCESS:
      copiedState.isAuthenticated = true;
      copiedState.userInfo = action.payload;

      return copiedState;
    case actionTypes.AUTHORIZATION_FAIL:
    case actionTypes.LOG_IN_FAIL:
      copiedState.isAuthenticated = false;
      copiedState.err = action.payload;
      copiedState.userInfo = null;

      return copiedState;
    case actionTypes.UPDATE_USER_NAME_SUCCESS:
    case actionTypes.UPDATE_USER_THUMNAIL_SUCCESS:
    case actionTypes.FOLLOW_USER_SUCCESS:
    case actionTypes.UNFOLLOW_USER_SUCCESS:
      copiedState.userInfo = action.payload;

      return copiedState;
    case actionTypes.UPDATE_USER_NAME_FAIL:
    case actionTypes.UPDATE_USER_THUMNAIL_FAIL:
    case actionTypes.FOLLOW_USER_FAIL:
    case actionTypes.UNFOLLOW_USER_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    case actionTypes.LOG_OUT_SUCCESS:
      return initialState;
    default:
      return copiedState;
  }
};

export default auth;
