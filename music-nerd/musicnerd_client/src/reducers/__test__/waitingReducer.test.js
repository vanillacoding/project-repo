import { waitingReducer } from '../waiting.reducer';
import * as actions from '../../constants/index';

const initialState = {
  socket: {},
  gameId: '',
  gameList: [],
  loading: false,
  createGameLoading: false,
  getGameListError: null,
  createGameError: null,
  joinGameError: null
};

describe('waiting reducer', () => {
  it('should return initial state', () => {
    expect(waitingReducer(initialState, {})).toEqual(initialState);
  });

  it('should update gameList when request success', () => {
    const gameList = ['game1', 'game2'];
    const getGameListAction = { type: actions.GET_GAMES_SUCCESS, gameList };

    expect(waitingReducer(initialState, getGameListAction)).toEqual({
      socket: {},
      gameId: '',
      gameList: ['game1', 'game2'],
      loading: false,
      createGameLoading: false,
      getGameListError: null,
      createGameError: null,
      joinGameError: null
    });
  });

  it('should update gameList when user created a game room', () => {
    const gameId = 'gameId1';
    const createGameAction = { type: actions.CREATE_GAME_SUCCESS, gameId };

    expect(waitingReducer(initialState, createGameAction)).toEqual({
      socket: {},
      gameId: 'gameId1',
      gameList: [],
      loading: false,
      createGameLoading: false,
      getGameListError: null,
      createGameError: null,
      joinGameError: null
    });
  });

  it('should update gameId when user join a game room', () => {
    const gameId = 'gameId1';
    const joinGameAction = { type: actions.JOIN_GAME_SUCCESS, gameId };

    expect(waitingReducer(initialState, joinGameAction)).toEqual({
      socket: {},
      gameId: 'gameId1',
      gameList: [],
      loading: false,
      createGameLoading: false,
      getGameListError: null,
      createGameError: null,
      joinGameError: null
    });
  });
});
