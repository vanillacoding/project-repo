import {
  SAVE_TARGET_GROUP_ID
} from '../constants/actionTypes';

const groupReducer = (state = "", action) => {
  switch (action.type) {
    case SAVE_TARGET_GROUP_ID:
      console.log("REDUCER !!!!! SAVED TARGET GROUP ID", action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default groupReducer;
