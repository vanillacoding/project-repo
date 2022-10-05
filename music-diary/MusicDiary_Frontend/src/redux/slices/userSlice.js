import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthCodeAPI, getAccessTokenAPI, getUserInfoAPI } from "../../api";
import * as SecureStore from "expo-secure-store";

export const loginUser = createAsyncThunk("USER/LOGIN_USER", async () => {
  try {
    const authCode = await getAuthCodeAPI();
    const { accessToken } = await getAccessTokenAPI(authCode);
    const { userInfo } = await getUserInfoAPI(accessToken);

    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("authCode", authCode);

    return { accessToken, userInfo };
  } catch (err) {
    console.error("failed to login", err);
  }
});

export const refreshToken = createAsyncThunk("USER/REFRESH_TOKEN", async () => {
  try {
    const authCode = await SecureStore.getItemAsync("authCode");
    const newAccessToken = await getAccessTokenAPI(authCode);

    await SecureStore.setItemAsync("accessToken", newAccessToken);

    return await SecureStore.getItemAsync("accessToken");
  } catch (err) {
    console.error("failed to refresh token", err);
  }
});

export const getAccessToken = createAsyncThunk(
  "USER/GET_ACCESSTOKEN",
  async () => {
    try {
      return await SecureStore.getItemAsync("accessToken");
    } catch (err) {
      if (err.status === 401) {
        return await refreshToken();
      }

      console.error("failed to get accessToken from the secure store ", err);
    }
  }
);

export const clearAccessToken = createAsyncThunk(
  "USER/CLEAR_ACCESSTOKEN",
  async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
    } catch (err) {
      console.error("failed to get accessToken from the secure store ", err);
    }
  }
);

const initialState = {
  accessToken: null,
  userInfo: {
    id: null,
    email: null,
    userName: null,
    privateDiaryList: [],
    uri: null,
    externalUrl: null,
  },
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.accessToken = action.payload?.accessToken;
      state.userInfo = action.payload?.userInfo;
      state.loading = false;
      state.error = false;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.reject]: (state, action) => {
      state.laoding = false;
      state.error = action.payload;
    },

    [getAccessToken.pending]: (state) => {
      state.laoding = true;
    },
    [getAccessToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
      state.loading = false;
      state.error = false;
    },

    [clearAccessToken.pending]: (state) => {
      state.laoding = true;
    },
    [clearAccessToken.rejected]: (state, action) => {
      state.laoding = true;
      state.error = action.payload;
    },
    [clearAccessToken.fulfilled]: (state) => {
      return initialState;
    },

    [refreshToken.fulfilled]: (state, action) => {
      state.userInfo.accessToken = action.payload;
    },
    [refreshToken.pending]: (state, action) => {
      state.laoding = true;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.laoding = true;
      state.error = action.payload;
    },
  },
});

const { clearUser } = userSlice.actions;
export { clearUser };
