import {
  JOIN_ROOM,
  LEAVE_ROOM
} from '../constants/actionTypes';

const memberInRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, ...action.payload };

    case LEAVE_ROOM:
      delete state[action.payload];
      return state;

    default:
      return state;
  }
};

export default memberInRoomReducer;
