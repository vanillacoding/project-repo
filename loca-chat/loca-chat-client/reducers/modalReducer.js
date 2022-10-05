import { MODAL_TOGGLE } from '../constants/actionTypes';

const initialState = {
  isVisible: false
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_TOGGLE:
      return {
        ...state,
        isVisible: !state.isVisible
      };
    default:
      return state;
  }
};
