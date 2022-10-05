import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.loading;
export const selectLoading = createSelector(selectSelf, (state) => state);
export const selectLoadingSequence = createSelector(
  selectSelf,
  (state) => state.sequence,
);
