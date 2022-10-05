import { createSlice } from '@reduxjs/toolkit';
import { createPosition } from '../../common/utils/chess';

const initialState = {
  piecePosition: { x: null, y: null },
  myTurnSequence: 0,
};

const chessSlice = createSlice({
  name: 'chess',
  initialState,
  reducers: {
    setPiecePosition: (state, { payload: tempPosition }) => {
      state.piecePosition = createPosition(tempPosition);
    },
    initializePiecePosition: (state) => {
      state.piecePosition = { x: null, y: null };
    },
    initializeTurnSequence: (state) => {
      state.myTurnSequence = 0;
    },
    nextTurnSequence: (state) => {
      state.myTurnSequence += 1;
    },
  },
});

export const {
  initializePiecePosition,
  setPiecePosition,
  initializeTurnSequence,
  nextTurnSequence,
} = chessSlice.actions;

export default chessSlice.reducer;
