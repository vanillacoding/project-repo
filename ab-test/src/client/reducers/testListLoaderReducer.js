import { LOADING_TEST_LIST, REMOVE_TEST_LIST_LOADER } from '../actions/types';

export default function modalReducer(state = false, action) {
  switch (action.type) {
    case LOADING_TEST_LIST:
      return action.payload;
    case REMOVE_TEST_LIST_LOADER:
      return action.payload;
    default:
      return state;
  }
}
