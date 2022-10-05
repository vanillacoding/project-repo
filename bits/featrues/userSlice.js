import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from "expo-secure-store";
import * as userApi from '../api/userApi';
import * as habitApi from '../api/habitApi';


export const fetchSignin = createAsyncThunk(
  'user/fetchSignin',
  async (loginInput, thunkAPI) => {
    try {
      const response = await userApi.requestSignin(loginInput);

      if (response.status === 200) {
        const { accessToken } = response;

        await SecureStore.setItemAsync('token', accessToken);

        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const registerHabit = createAsyncThunk(
  'user/registerHabit',
  async (registerInput, thunkAPI) => {
    try {
      const response = await habitApi.postHabit(registerInput);

      if (response.status === 201) {
        return response.habits;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateHabit = createAsyncThunk(
  'user/updateHabit',
  async (updateInput, thunkAPI) => {
    try {
      const response = await habitApi.patchHabit(updateInput);

      if (response.status === 200) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const removeHabit = createAsyncThunk(
  'user/removeHabit',
  async (deleteInput, thunkAPI) => {
    try {
      const response = await habitApi.deleteHabit(deleteInput);

      if (response.status === 200) {
        return deleteInput.targetIndex;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await userApi.getUsers();

      if (response.status === 200) {
        return response.payload;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (followingInfo, thunkApi) => {
    try {
      const response = await userApi.patchUserFollow(followingInfo);

      if (response.status === 200) {
        return response.following;
      }

      return thunkApi.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateImageUri = createAsyncThunk(
  'user/updateImageUri',
  async (imageUriPayload, thunkApi) => {
    try {
      const response = await userApi.patchImageUri(imageUriPayload);

      if (response.status === 201) {
        return response.uri;
      }

      return thunkApi.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchPushTokens = createAsyncThunk(
  'user/fetchPushTokens',
  async (_, thunkApi) => {
    try {
      const response = await userApi.getPushTokens();

      if (response.status === 200) {
        return response.pushTokens;
      }

      return thunkApi.rejectWithValue(response);
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  email: '',
  userName: '',
  imageUri: '',
  pushToken: '',
  errorMessage: '',
  followers: [],
  following: [],
  completedHabits: [],
  completedDates: [],
  habits: [],
  allUsers: [],
  followerPushTokens: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerPushToken: (state, { payload }) => {
      state.pushToken = payload.pushToken;
    },
    resetUserState: () => {
      return initialState;
    }
  },
  extraReducers: {
    [fetchSignin.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.userName = payload.userName;
      state.habits = payload.habits;
      state.following = payload.following;
      state.imageUri = payload.imageUri;
      state.completedDates = payload.completedDates;
      state.completedHabits = payload.completedHabits;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogedIn = true;
    },
    [fetchSignin.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchSignin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [registerHabit.fulfilled]: (state, { payload }) => {
      state.habits = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [registerHabit.pending]: (state) => {
      state.isFetching = true;
    },
    [registerHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [removeHabit.fulfilled]: (state, { payload }) => {
      state.habits.splice(payload, 1);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [removeHabit.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [removeHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updateHabit.fulfilled]: (state, { payload }) => {
      state.habits = payload.habits;
      state.completedHabits = payload.completedHabits;
      state.completedDates = payload.completedDates;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [updateHabit.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [updateHabit.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.allUsers = payload.users;
      state.following = payload.following;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [fetchUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [followUser.fulfilled]: (state, { payload }) => {
      state.following = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [followUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
    },
    [followUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updateImageUri.fulfilled]: (state, { payload }) => {
      state.imageUri = payload;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [fetchPushTokens.fulfilled]: (state, { payload }) => {
      state.followerPushTokens = payload;
      state.isFetching = false;
      state.isSuccess = true;
    }
  }
});
