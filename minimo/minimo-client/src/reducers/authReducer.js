export const TYPES = {
  AUTH_TRY: 'AUTH_TRY',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  AUTH_CLEAN_UP: 'AUTH_CLEAN_UP',
};

export default function authReducer(state, action) {
  switch (action.type) {
    case TYPES.AUTH_TRY:
      return { ...state, isLoading: true };
    case TYPES.AUTH_SUCCESS:
      return { ...state, isLoading: false };
    case TYPES.AUTH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case TYPES.AUTH_CLEAN_UP:
      return { ...state, isLoading: false, error: null };
    default:
      return state;
  }
}
