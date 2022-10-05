import { LOG_IN_SUCCESS, LOADING, LOG_OUT } from '../constants/index'

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
};

const render = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default render;
