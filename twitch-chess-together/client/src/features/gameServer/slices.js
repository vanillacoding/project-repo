import { createSlice } from '@reduxjs/toolkit';
import {
  loadState,
  saveState,
  clearState,
} from '../../common/utils/localStorage';

const GAME_SERVER = 'gameServer';

const loadedState = loadState(GAME_SERVER);

const initialState = {
  roomId: loadedState ? loadedState.roomId : null,
  status: false,
};

const gameSlice = createSlice({
  name: GAME_SERVER,
  initialState,
  reducers: {
    initGameServer: (state) => {
      state.status = true;
    },
    cancelGameServer: (state) => {
      state.status = false;
      clearState();
    },
    setGameServerRoomId: (state, { payload: roomId }) => {
      state.roomId = roomId;
      saveState(GAME_SERVER, { roomId });
    },
  },
});

export const { initGameServer, cancelGameServer, setGameServerRoomId } =
  gameSlice.actions;

export default gameSlice.reducer;
