import * as types from '../constants/actionTypes';

const modalInitState = {
  isModalOpened: false
};

const modalReducer = (state = modalInitState, action) => {
  switch (action.type) {
    case (types.OPEN_MODAL):
      return {
        isModalOpened: true
      };
    case (types.CLOSE_MODAL):
      return {
        isModalOpened: false
      };
    default:
      return state;
  }
};

export default modalReducer;
