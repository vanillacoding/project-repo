import { takeLatest, put, all, call } from 'redux-saga/effects';

import types from './user.actionTypes';
import * as actions from './user.actions';

import { userService } from '../../utils/api';

export function* loginUser({ payload }) {
  try {
    const { loginType } = payload;
    let authorizedUser;

    if (loginType === 'token') {
      const { user } = yield userService.tokenLogin();
      authorizedUser = user;
    }

    if (loginType === 'google') {
      const { user } = yield userService.googleLogin();
      authorizedUser = user;
    }

    yield put(actions.loginUserSuccess(authorizedUser));
  } catch (err) {
    yield put(actions.loginUserFailure(err));
  }
}

export function* logoutUser({ payload }) {
  try {
    const { userId } = payload;
    yield userService.logout(userId);
    yield put(actions.logoutUserSuccess());
  } catch (err) {
    yield put(actions.logoutUserFailure(err));
  }
}

export function* getFriendList({ payload }) {
  try {
    const { userId } = payload;
    const friendList = yield userService.getFriendList(userId);
    yield put(actions.addFriendListSuccess(friendList));
  } catch (err) {
    yield put(actions.addFriendListFailure(err));
  }
}

export function* getFriendRequestList({ payload }) {
  try {
    const { userId } = payload;
    const friendRequestList = yield userService.getFriendRequestList(userId);
    yield put(actions.addFriendRequestListSuccess(friendRequestList));
  } catch (err) {
    yield put(actions.addFriendRequestListFailure(err));
  }
}

export function* responseFriendRequest({ payload }) {
  try {
    const { userId, isAccepted, targetUserId } = payload;
    const friendRequestList = yield userService.responseFriendRequest(
      userId,
      isAccepted,
      targetUserId,
    );
    yield put(actions.responseFriendRequestSuccess(friendRequestList));
  } catch (err) {
    yield put(actions.responseFriendRequestFailure(err));
  }
}

export function* watchLoginUserStart() {
  yield takeLatest(types.LOGIN_USER_START, loginUser);
}

export function* watchLogoutStart() {
  yield takeLatest(types.LOGOUT_USER_START, logoutUser);
}

export function* watchFriendListStart() {
  yield takeLatest(types.ADD_FRIEND_LIST_START, getFriendList);
}

export function* watchFriendRequestListStart() {
  yield takeLatest(types.ADD_FRIEND_REQUEST_LIST_START, getFriendRequestList);
}

export function* watchResponseFriendRequestStart() {
  yield takeLatest(types.RESPONSE_FRIEND_REQUEST_START, responseFriendRequest);
}

export default function* userSagas() {
  yield all([
    call(watchLoginUserStart),
    call(watchLogoutStart),
    call(watchFriendListStart),
    call(watchFriendRequestListStart),
    call(watchResponseFriendRequestStart),
  ]);
}
