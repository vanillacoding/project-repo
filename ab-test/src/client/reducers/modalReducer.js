import { DISPLAY_MODAL, REMOVE_MODAL } from '../actions/types';

const initialState = {
  showModal: false,
  message: '',
};

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_MODAL:
      return {
        showModal: true,
        message: action.payload,
      };
    case REMOVE_MODAL:
      return {
        showModal: false,
        message: action.payload,
      };
    default:
      return state;
  }
}
