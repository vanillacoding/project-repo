import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/utils/localStorage';

const GAME = 'game';
const loadedGameState = loadState(GAME);

const initialState = loadedGameState || {
  gameId: null,
  firstTurn: null,
  currentTurn: null,
  winner: null,
  status: null,
  process: [],
  players: [],
};

const gameSlice = createSlice({
  name: GAME,
  initialState,
  reducers: {
    initCreateGame: () => {},
    createGame: (
      state,
      { payload: { gameId, players, firstTurn, status } },
    ) => {
      state.gameId = gameId;
      state.firstTurn = firstTurn;
      state.currentTurn = firstTurn;
      state.status = status;
      state.players = players;
      saveState(GAME, state);
    },
    setTimeInterval: (state, { payload: timeInterval }) => {
      state.timeInterval = timeInterval;
    },
    setWinner: (state, { payload }) => {
      state.winner = payload;
    },
    addCommand: (state, { payload: command }) => {
      state.process.push(command);
    },
    addLatestCommand: (state) => {
      state.process.push(state.process.slice(-2, -1)[0]);
    },
    addDuplicateCommand: (state) => {
      state.process.push(state.process.slice(-1)[0]);
    },
    getCommand: (state, { payload: command }) => {
      state.process.push(command);
    },
    gameTurnIsOver: (state) => {
      state.currentTurn = state.currentTurn ? 0 : 1;
    },
    gameTurnIsStarted: (state, { payload: turn }) => {
      state.currentTurn = turn;
    },
    initStartGame: (state) => {
      state.status = 'playing';
    },
    initJoinGame: (state) => {
      state.status = 'playing';
    },
    initEndGame: (state) => {
      state.status = 'end';
    },
    initializeGameState: (state) => {
      state.gameId = null;
      state.firstTurn = null;
      state.currentTurn = null;
      state.winner = null;
      state.status = null;
      state.process = [];
      state.players = [];
    },
  },
});

export const {
  initStartGame,
  initCreateGame,
  initJoinGame,
  createGame,
  initEndGame,
  addCommand,
  changePlayerTurn,
  setWinner,
  initializeGameState,
  addLatestCommand,
  gameTurnIsStarted,
  addDuplicateCommand,
  getCommand,
  gameTurnIsOver,
} = gameSlice.actions;

export default gameSlice.reducer;
