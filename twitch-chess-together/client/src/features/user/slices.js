import { createSlice } from '@reduxjs/toolkit';
import {
  loadState,
  saveState,
  clearState,
} from '../../common/utils/localStorage';

const USER = 'user';
const loadedUserState = loadState(USER);

const initialState = loadedUserState || {
  id: null,
  displayName: null,
  login: null,
  profileImageUrl: null,
  email: null,
};

const userSlice = createSlice({
  name: USER,
  initialState,
  reducers: {
    initLogin: () => {},
    initLogout: () => {},
    addUser: (state, { payload }) => {
      const {
        id,
        email,
        login,
        display_name: displayName,
        profile_image_url: profileImageUrl,
      } = payload;

      state.id = id;
      state.login = login;
      state.displayName = displayName;
      state.email = email;
      state.profileImageUrl = profileImageUrl;
      saveState(USER, state);
    },
    clearUser: (state) => {
      state.id = null;
      state.login = null;
      state.displayName = null;
      state.email = null;
      state.profileImageUrl = null;
      clearState();
    },
  },
});

export const { initLogin, initLogout, addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
