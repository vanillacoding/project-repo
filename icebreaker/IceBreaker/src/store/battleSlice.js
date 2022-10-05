import { createSlice } from '@reduxjs/toolkit';

const name = 'battle';
const initialState = {
  rooms: null,
  roomId: '',
  breakers: [],
  userName: '',
  id: null,
  opponentId: null,
};

const battleSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveRoomData(state, action) {
      state.rooms = action.payload;
    },
    saveRoomId(state, action) {
      state.roomId = action.payload;
    },
    saveBreakers(state, action) {
      state.breakers = action.payload;
    },
    saveUserName(state, action) {
      state.userName = action.payload;
    },
    saveId(state, action) {
      const { id, opponentId } = action.payload;
      state.opponentId = opponentId;
      state.id = id;
    },
    resetBattleForGameOver(state) {
      state.breakers = [];
      state.userName = '';
      state.id = null;
      state.opponentId = null;
      state.opponentLevel = null;
    },
  },
});

export const {
  saveRoomData,
  saveRoomId,
  saveBreakers,
  saveUserName,
  saveId,
  saveOpponentLevel,
  receiveAttack,
  resetBattleForGameOver,
} = battleSlice.actions;

export default battleSlice.reducer;
