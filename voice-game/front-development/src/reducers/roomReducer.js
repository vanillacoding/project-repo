import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  littleForest: [],
  monsterEscape: [],
  energyBattle: [],
  error: null,
};

const roomReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.FETCH_ROOMS:
    case ACTION_TYPES.CREATE_ROOM:
    case ACTION_TYPES.JOIN_ROOM:
    case ACTION_TYPES.LEAVE_ROOM:
    case ACTION_TYPES.DELETE_ROOM:
    case ACTION_TYPES.CHANGE_ROOM_STATUS:
      return copiedState;

    case ACTION_TYPES.FETCH_ROOMS_SUCCESS:
      copiedState[action.payload.gameTitle] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.CREATE_ROOM_SUCCESS:
      copiedState[action.payload.title].push(action.payload);
      return copiedState;

    case ACTION_TYPES.JOIN_ROOM_SUCCESS:
    case ACTION_TYPES.LEAVE_ROOM_SUCCESS:
    case ACTION_TYPES.DELETE_ROOM_SUCCESS:
    case ACTION_TYPES.CHANGE_ROOM_STATUS_SUCCESS:
      copiedState[action.payload.title] = action.payload.rooms;
      return copiedState;

    case ACTION_TYPES.FETCH_ROOMS_FAIL:
    case ACTION_TYPES.CREATE_ROOM_FAIL:
    case ACTION_TYPES.JOIN_ROOM_FAIL:
    case ACTION_TYPES.LEAVE_ROOM_FAIL:
    case ACTION_TYPES.DELETE_ROOM_FAIL:
    case ACTION_TYPES.CHANGE_ROOM_STATUS_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default roomReducer;
