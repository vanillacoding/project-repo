import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, getUserInfos } from "../api/auth";
import { storeUserInfos, removeUserInfos } from "../helpers/userInfo";

const initialState = {
  id: "",
  name: "guest",
  customCategories: [],
  lastAccessDate: "",
};

const login = createAsyncThunk("user/login",
  async function ({ idToken }) {
    try {
      const { accessToken, refreshToken } = await postLogin(idToken);

      storeUserInfos({ accessToken, refreshToken });

      const {
        userId, name, customCategories, lastAccessDate,
      } = await getUserInfos();

      return {
        userId, name, customCategories, lastAccessDate,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  });

const logout = createAsyncThunk("user/logout", removeUserInfos);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfos(state, { payload }) {
      const {
        userId, name, customCategories, lastAccessDate,
      } = payload;

      if (userId && name && customCategories && lastAccessDate) {
        state.id = userId;
        state.name = name;
        state.customCategories = customCategories;
        state.lastAccessDate = lastAccessDate;
      } else {
        state.id = null;
        state.name = "guest";
        state.customCategories = [];
        state.lastAccessDate = null;
      }
    },
    setCustomCategories(state, { payload }) {
      state.customCategories = payload;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.id = payload.userId;
      state.name = payload.name;
      state.customCategories = payload.customCategories;
      state.lastAccessDate = payload.lastAccessDate;
    },
    [login.rejected]: (state) => {
      state.id = null;
      state.name = "guest";
      state.customCategories = [];
      state.lastAccessDate = null;
    },
    [logout.fulfilled]: (state) => {
      state.id = null;
      state.name = "guest";
      state.customCategories = [];
      state.lastAccessDate = null;
    },
  },
});

export const { setUserInfos, setCustomCategories } = userSlice.actions;
export { login, logout };
export default userSlice.reducer;
