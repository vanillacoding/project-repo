import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { googleLogin, getUserData, patchUserCharacter } from '../apis';

export const getUserDataByToken = createAsyncThunk(
  'user/getUserDataByToken',
  async (history) => {
    const response = await getUserData();

    if (history) {
      history.push('/waitingarea');
    }

    return response;
  },
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (history) => {
    const response = await googleLogin();

    history.push('/waitingarea');

    return response;
  },
);

export const setUserCharacter = createAsyncThunk(
  'user/setUserCharacter',
  async (data) => {
    const response = await patchUserCharacter(data);

    return response;
  },
);

const initialState = {
  status: null,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.status = null;
      state.data = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.status = 'pending';
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = 'active';
      state.data = action.payload.user;
    },
    [userLogin.rejected]: (state) => {
      state.status = null;
    },
    [getUserDataByToken.pending]: (state) => {
      state.status = 'pending';
    },
    [getUserDataByToken.fulfilled]: (state, action) => {
      state.status = 'active';
      state.data = action.payload.user;
    },
    [getUserDataByToken.rejected]: (state) => {
      state.status = null;
      localStorage.removeItem('accessToken');
    },
    [setUserCharacter.pending]: (state) => {
      state.status = 'pending';
    },
    [setUserCharacter.fulfilled]: (state, action) => {
      state.status = 'active';
      state.data.character = action.payload.character;
      state.data.nickname = action.payload.nickname;
    },
    [setUserCharacter.rejected]: (state) => {
      state.status = null;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
