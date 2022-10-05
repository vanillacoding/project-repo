import { SET_CURRENT_PROJECT_ID, REMOVE_CURRENT_PROJECT_ID } from '../actions/types';

export default function currentProjectReducer(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_PROJECT_ID:
      return action.payload;
    case REMOVE_CURRENT_PROJECT_ID:
      return action.payload;
    default:
      return state;
  }
}
