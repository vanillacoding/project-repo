import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import {
  listenUpdateData,
  gameStart,
  joinWaitingRoom,
  listenJoinUser,
  listenGameStart,
  disconnectRoom,
} from '../utils/socket';
import { TYPE, emit } from '../utils/native';
import { setRoute } from './route';

const initGameInfo = {
  _id: '',
  name: '',
  owner: '',
  quizList: [],
  timeLimit: 0,
  location: {},
  address: '',
  addressDetail: '',
  createdAt: '',
  updatedAt: '',
};

export const INIT_GAME_SETTING = 'currentGameReducer/UPDATE_CURRENT_GAME';
export const SET_USERS = 'currentGameReducer/SET_USERS';
export const SET_GAME_INFO = 'currentGameReducer/SET_GAME_INFO';
export const COUNTDOWN = 'currentGameReducer/COUNTDOWN';
export const SET_COUNT = 'currentGameReducer/SET_COUNT';
export const SET_GAME_ID = 'currentGameReducer/SET_GAME_ID';
export const START_GAME = 'currentGameReducer/START_GAME';
export const DISCONNECT_GAME = 'currentGameReducer/DISCONNECT_GAME';
export const UPDATE_CURRENT_GAME = 'currentGameReducer/UPDATE_CURRENT_GAME';
export const SET_IS_PLAYING_TRUE = 'currentGameReducer/SET_IS_PLAYING_TRUE';
export const SET_IS_PLAYING_FALSE = 'currentGameReducer/SET_IS_PLAYING_FALSE';

export const setUsers = createAction(SET_USERS);
export const setGameInfo = createAction(SET_GAME_INFO);
export const setCount = createAction(SET_COUNT);
export const setGameId = createAction(SET_GAME_ID);
export const updateCurrentGame = createAction(UPDATE_CURRENT_GAME);
export const setIsPlayingTrue = createAction(SET_IS_PLAYING_TRUE);
export const setIsPlayingFalse = createAction(SET_IS_PLAYING_FALSE);

export const startGame = createAsyncThunk(
  START_GAME,
  async ({ gameId }, extra) => {
    gameStart({ gameId });
  },
);

export const initGameSetting = createAsyncThunk(
  INIT_GAME_SETTING,
  async ({ gameId, userId, username, image, color }, { dispatch }) => {
    joinWaitingRoom({ gameId, userId, username, image, color });
    listenJoinUser(({ users }) => {
      dispatch(setUsers(users));
    });
    listenGameStart(({ gameInfo, users, _id }) => {
      dispatch(setGameInfo({ gameInfo, users, _id }));
      dispatch(countdown(3));
    });

    dispatch(setGameId(gameId));
  },
);

export const countdown = createAsyncThunk(
  COUNTDOWN,
  async (countNumber, { dispatch, getState }) => {
    if (countNumber > 0) {
      dispatch(setCount(countNumber));
      setTimeout(() => {
        dispatch(countdown(countNumber - 1));
      }, 1000);
    } else {
      const { gameId } = getState().currentGame;
      const { isNative } = getState().user;

      dispatch(setCount(3));

      if (isNative) {
        const game = getState().currentGame;
        emit(TYPE.setGame, game);
        listenUpdateData((data) => {
          emit(TYPE.updateGame, data);
        });
        dispatch(setRoute(`/games/${gameId}/result`));
      } else {
        dispatch(setRoute(`/games/${gameId}/playing`));
      }
    }
  },
);

export const disconnectGame = createAsyncThunk(
  DISCONNECT_GAME,
  async ({ gameId }, { dispatch }) => {
    disconnectRoom({ gameId });

    dispatch(setGameInfo({ gameInfo: initGameInfo, users: [], _id: '' }));
    dispatch(setRoute('/games'));
    dispatch(setCount(-1));
  },
);

const initState = {
  gameInfo: initGameInfo,
  isPlaying: false,
  users: [],
  count: -1,
  gameId: '',
};

export default createReducer(initState, {
  [UPDATE_CURRENT_GAME]: (state, action) => {
    state.users = action.payload.users;
  },
  [SET_USERS]: (state, { payload }) => { state.users = payload; },
  [SET_GAME_INFO]: (state, { payload }) => {
    state.gameInfo = payload.gameInfo;
    state.users = payload.users;
    state.gameId = payload._id;
  },
  [SET_COUNT]: (state, { payload }) => { state.count = payload; },
  [SET_GAME_ID]: (state, { payload }) => { state.gameId = payload; },
  [SET_IS_PLAYING_TRUE]: (state, action) => { state.isPlaying = true; },
  [SET_IS_PLAYING_FALSE]: (state, action) => { state.isPlaying = false; },
});
