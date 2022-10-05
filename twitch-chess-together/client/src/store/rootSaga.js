import { all } from 'redux-saga/effects';
import chatServerSaga from '../features/chatServer/sagas';
import gameServerSaga from '../features/gameServer/sagas';
import gameSaga from '../features/game/sagas';
import userSaga from '../features/user/sagas';

export default function* rootSaga() {
  yield all([chatServerSaga(), gameServerSaga(), gameSaga(), userSaga()]);
}
