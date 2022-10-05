import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiController from '../../configs/apiController';
import { MESSAGES } from '../../constants';

export const loginSuccess = createAsyncThunk(
  'users/login',
  async ({ name, email, photoURL }, { rejectWithValue }) => {
    try {
      const response = await apiController.post('users/login', {
        email,
        name,
        photoURL,
      });

      return response.data;
    } catch {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiController.get('users/auth');

      return response.data;
    } catch {
      return rejectWithValue(MESSAGES.UNKNOWN_ERROR);
    }
  },
);

const iniitalUser = {
  _id: '',
  email: '',
  name: '',
  photoURL: '',
};

export const slice = createSlice({
  name: 'user',
  initialState: {
    info: iniitalUser,
    error: null,
    isLogin: Boolean(localStorage.getItem('user')),
  },
  reducers: {
    logoutSuccess: (state) => {
      state.info = iniitalUser;
      state.isLogin = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginSuccess.fulfilled, (state, action) => {
      state.info = action.payload.user;
      state.isLogin = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });
    builder.addCase(loginSuccess.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default slice.reducer;

export const { logoutSuccess } = slice.actions;
