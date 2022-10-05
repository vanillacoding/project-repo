import { eventChannel } from 'redux-saga';
import {
  call,
  take,
  put,
  cancel,
  fork,
  select,
  delay,
} from 'redux-saga/effects';
import tmi from 'tmi.js';

import {
  initChatServer,
  cancelChatServer,
  collectMessages,
  notifyGameInfo,
  notifyGameWinner,
} from './slices';
import { selectChatServerName } from './selectors';
import { nextSequence } from '../loading/slices';
import { selectGameWinnerInfo } from '../game/selectors';

const connect = (serverName) => {
  const client = new tmi.Client({
    identity: {
      username: 'ChessGameHelper',
      password: process.env.REACT_APP_TWITCH_BOT_OAUTH,
    },
    channels: [serverName],
  });
  client.connect();
  return new Promise((resolve) => {
    client.on('connected', () => {
      client.action(serverName, 'TWITCH-CHESS-TOGETHER 게임 준비 완료.');
      resolve(client);
    });
  });
};

function subscribe(client) {
  return eventChannel((emitter) => {
    client.on('ping', () => {
      client.on('pong', () => {});
    });

    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      const author = tags['display-name'];
      const { id } = tags;
      return emitter({
        type: collectMessages.type,
        payload: { id, author, message },
      });
    });

    return () => {
      client.disconnect();
    };
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* watchNotifyGameInfo(channel, serverName) {
  while (true) {
    const { payload: notifyMessage } = yield take(notifyGameInfo.type);
    yield delay(1500);
    channel.action(serverName, notifyMessage);
  }
}

function* watchNotifyGameWinner(channel, serverName) {
  while (true) {
    yield take(notifyGameWinner.type);
    const { displayName } = yield select(selectGameWinnerInfo);
    channel.action(serverName, `${displayName} 승리`);
  }
}

function* write(channel, serverName) {
  yield fork(watchNotifyGameInfo, channel, serverName);
  yield fork(watchNotifyGameWinner, channel, serverName);
}

function* handleIO(channel, serverName) {
  yield fork(read, channel);
  yield fork(write, channel, serverName);
}

function* flow() {
  while (true) {
    yield take(initChatServer.type);
    const serverName = yield select(selectChatServerName);
    const channel = yield call(() => connect(serverName));

    yield put({ type: nextSequence.type });
    const task = yield fork(handleIO, channel, serverName);

    yield take(cancelChatServer.type);
    yield cancel(task);
  }
}

export default function* chatServerSaga() {
  yield fork(flow);
}
