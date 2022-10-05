import { take, fork, call, put } from 'redux-saga/effects';

import { addUser, clearUser, initLogin, initLogout } from './slices';

import { fetchUserData, ejectUserData } from '../../common/apis/user';
import { setChatServerName } from '../chatServer/slices';

function* clearUserData() {
  while (true) {
    yield take(initLogout.type);
    yield call(ejectUserData);
    yield put({ type: clearUser.type });
  }
}

function* getUserData() {
  while (true) {
    yield take(initLogin.type);
    const { data } = yield call(fetchUserData);
    const userProfile = JSON.parse(data.userProfile);
    const { login: serverName } = userProfile;
    yield put({ type: addUser.type, payload: userProfile });
    yield put({ type: setChatServerName.type, payload: { serverName } });
  }
}

function* flow() {
  yield fork(getUserData);
  yield fork(clearUserData);
}

export default function* userSaga() {
  yield fork(flow);
}
