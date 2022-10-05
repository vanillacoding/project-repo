import { createSlice } from '@reduxjs/toolkit';

import { loadState, saveState } from '../../common/utils/localStorage';
import messagePhaser from '../../common/utils/chatFilter';

const CHAT_SERVER = 'chatServer';
const loadedServerName = loadState(CHAT_SERVER);
const initialCommandsState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const initialState = {
  status: false,
  serverName: loadedServerName ? loadedServerName.serverName : null,
  commands: initialCommandsState,
};

const chatServerSlice = createSlice({
  name: CHAT_SERVER,
  initialState,
  reducers: {
    initChatServer: (state) => {
      state.status = true;
    },
    cancelChatServer: (state) => {
      state.status = false;
    },
    setChatServerName: (state, { payload }) => {
      const { serverName } = payload;
      state.serverName = serverName;
      saveState(CHAT_SERVER, { serverName });
    },
    collectMessages: (state, { payload }) => {
      const { id, author, message } = payload;
      const filteredMessage = messagePhaser(message);

      if (!filteredMessage) return;

      const { command, content } = filteredMessage;
      state.commands.shift();
      state.commands.push({ id, author, command, content });
    },
    notifyGameInfo: (state, { payload: notifyMessage }) => {
      state.notifyMessage = notifyMessage;
    },
    notifyGameWinner: () => {},
    clearCommands: (state) => {
      state.commands = initialCommandsState;
    },
  },
});

export const {
  initChatServer,
  cancelChatServer,
  setChatServerName,
  collectMessages,
  clearCommands,
  notifyGameInfo,
  notifyGameWinner,
} = chatServerSlice.actions;

export default chatServerSlice.reducer;
