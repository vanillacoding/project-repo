import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER_LOCATION
} from '../constants/actionTypes';

const initialState = {
  isloggedIn: false,
  userData: null,
  coords: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isloggedIn: true,
        userData: action.data
      };
    case USER_LOGOUT:
      return {
        ...state,
        isloggedIn: false,
        userData: null
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        coords: action.coords
      };
    default:
      return state;
  }
}
