import { 
  LOG_IN_SUCCESS_USER,
  LOCATION_SUCCESS, 
  UPDATE_USER_CATS,
  GET_USER_LOCATION,
} from '../constants/index';

const initialState = {
  facebookId: null,
  name: null,
  location: null,
  cats: null,
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN_SUCCESS_USER:
      return {
        ...state,
        ...action.user,
      };
    case LOCATION_SUCCESS:
    case GET_USER_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case UPDATE_USER_CATS:
      return {
        ...state,
        cats: action.cats,
      };
    default:
      return {
        ...state,
      };
  }
};

export default user;
