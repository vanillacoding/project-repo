import { createSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.chatServer;

export const selectChatServer = createSelector(selectSelf, (state) => state);

export const selectChatServerPassword = createSelector(
  selectSelf,
  (state) => state.password,
);

export const selectChatServerName = createSelector(
  selectSelf,
  (state) => state.serverName,
);

export const selectChatServerStatus = createSelector(
  selectSelf,
  (state) => state.status,
);

export const selectChatServerCommands = createSelector(
  selectSelf,
  (state) => state.commands,
);
