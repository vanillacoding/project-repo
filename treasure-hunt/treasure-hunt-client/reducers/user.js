import { GET_LOGINUSER, GET_LOGOUTUSER } from '../constants/actionTypes';

const initialState = {
  isLogin: false,
  userInfo: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_LOGINUSER:
      return { isLogin: true, userInfo: action.userInfo };
    case GET_LOGOUTUSER:
      return { isLogin: false, userInfo: {} };
    default:
      return state;
  }
}
