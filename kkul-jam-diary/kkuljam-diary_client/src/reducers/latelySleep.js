import * as types from '../constants/actionTypes';

const initialState = {
  sleeps: {},
  isPending: false,
  isError: false
};

const latelySleep = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LATELY_SLEEP_SUCCESS:
      return {
        ...state,
        sleeps: action.sleep
      };
    default: return state;
  }
};

export default latelySleep;
