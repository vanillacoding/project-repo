import { FETCH_TESTLIST, ADD_NEW_TEST, DELETE_TEST_PAGE } from '../actions/types';

export default function testListReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TESTLIST:
      if (action.payload[0]) {
        return [...action.payload];
      }

      return [...state];
    case ADD_NEW_TEST:
      return [
        ...state,
        action.payload,
      ];
    case DELETE_TEST_PAGE:
      const filteredPages = state.filter(page => page._id !== action.payload);

      return [
        ...filteredPages,
      ];
    default:
      return state;
  }
}
