import {
  USER_LOGIN,
  USER_LOGOUT
} from "../constants/actionTypes";

export function loginUser(userInfo) {
  return {
    type: USER_LOGIN,
    payload: userInfo
  };
}

export function logoutUser() {
  return {
    type: USER_LOGOUT
  };
}
