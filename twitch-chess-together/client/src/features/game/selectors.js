import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.game;

export const selectGame = createSelector(selectSelf, (state) => state);

export const selectGameWinner = createSelector(
  selectSelf,
  (state) => state.winner,
);

export const selectGameWinnerInfo = createSelector(
  selectSelf,
  (state) => state.players[state.winner],
);

export const selectGameId = createSelector(selectSelf, (state) => state.gameId);

export const selectGamePlayers = createSelector(
  selectSelf,
  (state) => state.players,
);

export const selectCurrentGamePlayer = createSelector(
  selectSelf,
  (state) => state.players[state.currentTurn],
);

export const selectGameProcess = createSelector(
  selectSelf,
  (state) => state.process,
);

export const selectGameLatestProcess = createSelector(selectSelf, (state) =>
  state.process.slice(-1),
);

export const selectGameCurrentTurn = createSelector(
  selectSelf,
  (state) => state.currentTurn,
);
