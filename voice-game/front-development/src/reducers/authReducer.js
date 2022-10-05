import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  isAuthorized: false,
  isMicOn: false,
  isUnAuthMode: false,
  playerData: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.CHECK_AUTHORIZATION:
    case ACTION_TYPES.PLAYER_LOGIN:
    case ACTION_TYPES.PATCH_RESULT:
    case ACTION_TYPES.UNAUTH_MODE:
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_SUCCESS:
    case ACTION_TYPES.PLAYER_LOGIN_SUCCESS:
      copiedState.isAuthorized = true;
      copiedState.playerData = action.payload;
      return copiedState;

    case ACTION_TYPES.PATCH_RESULT_SUCCESS:
      copiedState.playerData = action.payload.player;
      return copiedState;

    case ACTION_TYPES.UNAUTH_MODE_SUCCESS:
      copiedState.isUnAuthMode = true;
      copiedState.playerData = action.payload;
      return copiedState;

    case ACTION_TYPES.PLAYER_LOGOUT:
      copiedState.isAuthorized = false;
      copiedState.playerData = null;
      return copiedState;

    case ACTION_TYPES.STOP_UNAUTH_MODE:
      copiedState.isUnAuthMode = false;
      copiedState.playerData = null;
      return copiedState;

    case ACTION_TYPES.PLAYER_MIC_ON:
      copiedState.isMicOn = true;
      return copiedState;

    case ACTION_TYPES.CHECK_AUTHORIZATION_FAIL:
    case ACTION_TYPES.PLAYER_LOGIN_FAIL:
    case ACTION_TYPES.PATCH_RESULT_FAIL:
    case ACTION_TYPES.UNAUTH_MODE_FAIL:
      copiedState.isAuthorized = false;
      return copiedState;

    default:
      return copiedState;
  }
};

export default authReducer;
