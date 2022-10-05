import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../api/user';
import {
  rememberCredentials,
  readCredentials,
  clearCredentials
} from '../api/secureStore';

export const fetchSignin = createAsyncThunk(
  'user/fetchSignin',
  async (loginInput, thunkAPI) => {
    try {
      if (!loginInput) {
        loginInput = await readCredentials();
      }

      const response = await userAPI.requestSignin(loginInput);

      if (response.code === 200) {
        rememberCredentials({
          email: loginInput.email,
          password: loginInput.password,
          token: response.data.appIdToken
        });

        return response.data;
      } else {
        await clearCredentials();

        return thunkAPI.rejectWithValue(response);
      }
    } catch (err) {
      console.log("err", err);
    }
  }
);

const initialState = {
  userId: '',
  username: '',
  email: '',
  isFetching: false,
  isSignedIn: false,
  isError: false,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut(state, action) {
      return initialState;
    },
    createError(state, action) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
    initError(state, action) {
      state.isError = false;
      state.errorMessage = '';
    }
  },
  extraReducers: {
    [fetchSignin.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSignedIn = true;
      state.userId = payload.currentUser._id;
      state.email = payload.currentUser.email;
      state.username = payload.currentUser.username;
      state.isError = false;
      state.errorMessage = '';
    },
    [fetchSignin.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchSignin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }
  }
});

export const { actions, reducer } = userSlice;
export const { signOut, createError, initError } = actions;

export default reducer;
