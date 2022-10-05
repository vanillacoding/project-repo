import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.chess;

export const selectChessPiecePosition = createSelector(
  selectSelf,
  (state) => state.piecePosition,
);

export const selectChessMyTurnSequence = createSelector(
  selectSelf,
  (state) => state.myTurnSequence,
);
