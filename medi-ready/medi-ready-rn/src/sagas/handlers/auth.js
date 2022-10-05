import { call, put } from "redux-saga/effects";

import signInWithGoogle from "../../utils/signInWithGoogle";
import { loginRequest, logoutRequest, authCheck } from "../../api/index";
import {
  failLogin,
  cancelLogin,
  setUserInfo,
  deleteUserInfo,
} from "../../redux/reducers/userSlice";

export function* handleLogin() {
  try {
    const userData = yield call(signInWithGoogle);

    if (!userData) {
      yield put(cancelLogin());
      return;
    }

    const { result, data } = yield call(loginRequest, userData);

    result === "success"
      ? yield put(setUserInfo(data))
      : yield put(cancelLogin());
  } catch (error) {
    yield put(failLogin(error));
  }
}

export function* handleLogout() {
  try {
    const response = yield call(logoutRequest);

    response.result === "success"
      ? yield put(deleteUserInfo())
      : yield put(cancelLogin());
  } catch (error) {
    yield put(failLogin(error));
  }
}

export function* handleAuthCheck() {
  try {
    const { result, data } = yield call(authCheck);

    result === "success"
      ? yield put(setUserInfo(data))
      : yield put(deleteUserInfo());
  } catch (error) {
    yield put(failLogin(error));
  }
}
