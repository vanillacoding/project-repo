import {
  FETCH_SCREENSHOT_URL,
  LOADING_SCREENSHOT_SOURCE,
  INITIALIZE_SCREENSHOT_STATE,
} from '../actions/types';

const initialState = {
  isLoading: false,
  source: '',
};

export default function screenshotReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_SCREENSHOT_SOURCE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case FETCH_SCREENSHOT_URL:
      return {
        isLoading: false,
        source: action.payload,
      };
    case INITIALIZE_SCREENSHOT_STATE:
      return action.payload;
    default:
      return state;
  }
}
