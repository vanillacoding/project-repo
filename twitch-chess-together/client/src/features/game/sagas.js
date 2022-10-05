import { take, call, fork, select, put } from 'redux-saga/effects';

import {
  createGame,
  initStartGame,
  initEndGame,
  initJoinGame,
  initCreateGame,
} from './slices';
import { selectGameServerRoomId } from '../gameServer/selectors';
import { nextSequence } from '../loading/slices';

import { createGameData, getGameData, joinGame } from '../../common/apis/game';
import { setGameServerRoomId } from '../gameServer/slices';
import { selectGame } from './selectors';

function* fetchGameData(gameId) {
  const { data } = yield call(getGameData, gameId);
  yield put({ type: createGame.type, payload: data });
  yield put({ type: nextSequence.type });
}

function* updateJoinedGameData({ userProfile, gameId }) {
  const { data } = yield call(joinGame, { userProfile, gameId });
  const { success } = data;

  if (success) {
    yield put({ type: setGameServerRoomId.type, payload: gameId });
    yield put({ type: nextSequence.type });
  }
}

function* watchCreateGameData() {
  while (true) {
    yield take(initCreateGame.type);
    const gameInfo = yield select(selectGame);
    const { data } = yield call(createGameData, gameInfo);
    const { success } = data;

    if (success) {
      yield put({ type: nextSequence.type });
    }
  }
}

function* watchGetGameData() {
  while (true) {
    yield take(initStartGame.type);
    const gameId = yield select(selectGameServerRoomId);
    yield call(fetchGameData, gameId);
  }
}

function* watchJoinGameRoom() {
  while (true) {
    const { payload } = yield take(initJoinGame.type);
    yield call(updateJoinedGameData, payload);
  }
}

function* flow() {
  yield fork(watchCreateGameData);
  yield fork(watchGetGameData);
  yield fork(watchJoinGameRoom);
  yield take(initEndGame.type);
}

export default function* gameSaga() {
  yield fork(flow);
}
