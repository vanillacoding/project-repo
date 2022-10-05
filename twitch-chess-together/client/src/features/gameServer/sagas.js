import { io } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, select } from 'redux-saga/effects';
import { initGameServer, cancelGameServer } from './slices';

import { selectUser } from '../user/selectors';
import {
  addCommand,
  getCommand,
  gameTurnIsOver,
  gameTurnIsStarted,
  addDuplicateCommand,
} from '../game/slices';

import { selectGameServerRoomId } from './selectors';
import { nextSequence } from '../loading/slices';
import {
  selectGameLatestProcess,
  selectGameCurrentTurn,
} from '../game/selectors';

function connect(roomId, userProfile) {
  const GAME_SERVER_ADDRESS = process.env.REACT_APP_GAME_SERVER_ADDRESS;

  const socket = io.connect(GAME_SERVER_ADDRESS);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      socket.emit('join', { roomId, userProfile });
      resolve(socket);
    });
  });
}

function subscribe(socket, roomId) {
  return eventChannel((emit) => {
    socket.on('user.count.update', (userCount) => {
      if (userCount >= 2) {
        socket.emit('game.ready', { roomId });
        emit({ type: nextSequence.type });
      }
    });

    socket.on('game.start', () => {
      emit({ type: nextSequence.type });
    });

    socket.on('game.get.command', (message) => {
      emit({ type: getCommand.type, payload: message });
    });

    socket.on('game.turn.start', (currentTurn) => {
      emit({ type: gameTurnIsStarted.type, payload: currentTurn });
    });

    return () => {
      socket.close();
    };
  });
}

function* read(socket, roomId) {
  const channel = yield call(subscribe, socket, roomId);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* sendCommand(socket, roomId) {
  while (true) {
    yield take([addCommand.type, addDuplicateCommand.type]);
    const latestCommand = yield select(selectGameLatestProcess);
    socket.emit('game.add.command', { roomId, message: latestCommand[0] });
  }
}

function* notifyMyTurnIsOver(socket, roomId) {
  while (true) {
    yield take(gameTurnIsOver.type);
    const currentTurn = yield select(selectGameCurrentTurn);
    socket.emit('game.turn.over', { roomId, currentTurn });
  }
}

function* write(socket, roomId) {
  yield fork(sendCommand, socket, roomId);
  yield fork(notifyMyTurnIsOver, socket, roomId);
}

function* handleIO(socket, roomId) {
  yield fork(read, socket, roomId);
  yield fork(write, socket, roomId);
}

function* flow() {
  while (true) {
    yield take(initGameServer.type);
    const roomId = yield select(selectGameServerRoomId);
    const userProfile = yield select(selectUser);
    const socket = yield call(() => connect(roomId, userProfile));

    yield put({ type: nextSequence.type });
    const task = yield fork(handleIO, socket, roomId);

    yield take(cancelGameServer.type);
    yield cancel(task);
  }
}

export default function* gameServerSaga() {
  yield fork(flow);
}
