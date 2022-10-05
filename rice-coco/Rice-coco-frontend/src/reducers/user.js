import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  birthYear: '',
  email: '',
  favoritePartners: [],
  gender: '',
  nickname: '',
  occupation: '',
  preferredPartner: {
    _id: '',
    birthYear: '',
    gender: '',
    occupation: '',
  },
  promise: 0,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case types.SET_USER_PROMISE:
      return {
        ...state,
        promise: action.payload,
      };
    case types.RESET_USER_INFO:
      return initialState;
    default:
      return state;
  }
};
