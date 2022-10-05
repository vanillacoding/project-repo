import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.gameServer;

export const selectGameServer = createSelector(selectSelf, (state) => state);

export const selectGameServerRoomId = createSelector(
  selectSelf,
  (state) => state.roomId,
);

export const selectGameServerStatus = createSelector(
  selectSelf,
  (state) => state.status,
);
