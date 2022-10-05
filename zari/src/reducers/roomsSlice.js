import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getRoomList } from '../apis';

export const getRooms = createAsyncThunk(
  'rooms/getRooms',
  async () => {
    const response = await getRoomList();

    return response;
  }
);

const initialState = {
  status: null,
  publicRooms: null,
  currentRoom: '',
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload.selectedRoom;
    },
  },
  extraReducers: {
    [getRooms.pending]: (state) => {
      state.status = 'pending';
    },
    [getRooms.fulfilled]: (state, action) => {
      state.status = 'active';
      state.publicRooms = action.payload.publicRooms;
    },
    [getRooms.rejected]: (state, action) => {
      state.status = null;
      state.publicRooms = null;
    },
  },
});

export const { setCurrentRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
