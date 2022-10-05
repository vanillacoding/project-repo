import * as types from '../constants/actionTypes';

const initialState = {
  latitude: 37.5055548,
  longitude: 127.0900086,
};

export const location = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCATION:
      return action.payload;
    default:
      return state;
  }
};
