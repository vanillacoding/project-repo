import { getSocket } from '../lib/socket';
import {
  UPDATE_GAME_HOST,
  UPDATE_PLAYERS_AND_READY_STATUS,
  UPDATE_READY_STATUS,
  UPDATE_CHAT_MESSAGES,
  UPDATE_GAME_STATUS,
  UPDATE_CURRENT_TRACK,
  UPDATE_SCORE_AND_PLAYLOG,
  UPDATE_PLAYLOG,
  UPDATE_GAMESTATE_TO_END,
  RESET_GAME_STATE
} from '../constants/index';

export const updateGameHost = dispatch => () => {
  const socket = getSocket();
  socket.on('gameHost', gameHost => {
    dispatch({ type: UPDATE_GAME_HOST, gameHost });
  });
};

export const updatePlayersAndReadyStatus = dispatch => () => {
  const socket = getSocket();
  socket.on('players and readyStatus', (players, readyStatus) => {
    dispatch({ type: UPDATE_PLAYERS_AND_READY_STATUS, players, readyStatus });
  });
};

export const updateReadyStatus = dispatch => () => {
  const socket = getSocket();
  socket.on('ready status', readyStatus => {
    dispatch({ type: UPDATE_READY_STATUS, readyStatus });
  });
};

export const updateChatMessages = dispatch => () => {
  const socket = getSocket();
  socket.on('chat messages', message => {
    dispatch({ type: UPDATE_CHAT_MESSAGES, message });
  });
};

export const updateGameStatus = dispatch => () => {
  const socket = getSocket();
  socket.on('ready to start', () => {
    dispatch({ type: UPDATE_GAME_STATUS });
  });
};

export const updateCurrentTrack = dispatch => () => {
  const socket = getSocket();
  socket.on('send a track', currentTrack => {
    dispatch({ type: UPDATE_CURRENT_TRACK, currentTrack });
  });
};

export const updateScoreAndPlayLog = dispatch => () => {
  const socket = getSocket();
  socket.on('correct answer', message => {
    dispatch({ type: UPDATE_SCORE_AND_PLAYLOG, message });
  });
};

export const updatePlayLog = dispatch => () => {
  dispatch({ type: UPDATE_PLAYLOG });
};

export const updateFinalScore = dispatch => () => {
  const socket = getSocket();
  socket.on('end game', () => {
    dispatch({ type: UPDATE_GAMESTATE_TO_END });
  });
};

export const resetGameState = dispatch => () => {
  dispatch({ type: RESET_GAME_STATE });
};
