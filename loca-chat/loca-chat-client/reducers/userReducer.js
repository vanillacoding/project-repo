import {
  GET_DEVICE_ADDRESS,
  SET_NICKNAME,
  SET_MY_LOCATIN
} from '../constants/actionTypes';

const initialState = {
  nickname: '',
  deviceAddress: '',
  latitude: '',
  longitude: ''
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.data
      };
    case GET_DEVICE_ADDRESS:
      return {
        ...state,
        deviceAddress: action.data
      };
    case SET_MY_LOCATIN:
      return {
        ...state,
        latitude: action.data.latitude,
        longitude: action.data.longitude
      };
    default:
      return state;
  }
};
