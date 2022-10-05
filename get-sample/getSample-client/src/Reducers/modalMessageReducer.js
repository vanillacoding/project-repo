import actionTypes from '../Constants/actionTypes';
const { UPDATE_MODAL_MESSAGE } = actionTypes;

export function modalMessageReducer(state = '', action) {
  switch (action.type) {
    case UPDATE_MODAL_MESSAGE:
      return action.data;

    default:
      return state;
  }
}
export default modalMessageReducer;
