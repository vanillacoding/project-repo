import {
  takeLatest,
  put,
  all,
  call,
} from "redux-saga/effects";

import history from "../utils/history";
import * as actions from "../reducers/user";
import { message } from "../constants";
import api from "../api";

function* loginLocal({ payload }) {
  try {
    const { profile, result, error } = yield call(api.loginLocal, payload);

    if (error) {
      yield put(actions.requestFailure(error));
      return;
    }

    if (!result) {
      yield put(actions.requestFailure(message.failLogin));
      return;
    }

    yield put(actions.loginSuccess(profile));

    localStorage.setItem("user", JSON.stringify(profile));

    if (profile.likeGenre.length) {
      history.push("/");
    } else {
      history.push(`/users/choose_genre/${profile._id}`);
    }
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* loginSocial({ payload }) {
  try {
    const user = yield call(api.loginSocialByType, payload);
    const { profile, result, error } = yield call(api.loginSocial, user);

    if (error) {
      yield put(actions.requestFailure(error));
      return;
    }

    if (!result) {
      yield put(actions.requestFailure(message.failLogin));
      return;
    }

    localStorage.setItem("user", JSON.stringify(profile));

    yield put(actions.loginSuccess(profile));

    if (profile.likeGenre.length) {
      history.push("/");
    } else {
      history.push(`/users/choose_genre/${profile._id}`);
    }
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* loginRefresh({ payload }) {
  try {
    const { profile } = yield call(api.loginRefresh, payload);

    yield put(actions.loginSuccess(profile));

    if (!profile.likeGenre.length) {
      history.push(`/users/choose_genre/${profile._id}`);
    }
  } catch (error) {
    yield put(actions.requestFailure(error.message));

    localStorage.removeItem("user");
  }
}

function* signup({ payload }) {
  try {
    const { result, error } = yield call(api.signup, payload);

    if (error) {
      yield put(actions.requestFailure(error));
      return;
    }

    if (!result) {
      yield put(actions.requestFailure(message.failSignup));
      return;
    }

    yield put(actions.signupSuccess());

    history.push("/login");
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* logout({ payload }) {
  try {
    const { result, error } = yield api.logout(payload);

    if (error) {
      yield put(actions.requestFailure(error));
      return;
    }

    if (!result) {
      yield put(actions.requestFailure(message.failLogout));
      return;
    }

    yield put(actions.logoutSuccess());

    localStorage.removeItem("user");

    history.push("/");
  } catch (error) {
    yield put(actions.requestFailure(error.message));
  }
}

function* watchRefreshLogin() {
  yield takeLatest(actions.refreshLoginRequest.type, loginRefresh);
}

function* watchLocalLogin() {
  yield takeLatest(actions.localLoginRequest.type, loginLocal);
}

function* watchSocialLogin() {
  yield takeLatest(actions.socialLoginRequest.type, loginSocial);
}

function* watchSignup() {
  yield takeLatest(actions.signupRequest.type, signup);
}

function* watchLogout() {
  yield takeLatest(actions.logoutRequest.type, logout);
}

export default function* userAuthSagas() {
  yield all([
    call(watchRefreshLogin),
    call(watchLocalLogin),
    call(watchSocialLogin),
    call(watchSignup),
    call(watchLogout),
  ]);
}
