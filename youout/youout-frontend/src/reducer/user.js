import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import firebase from '../utils/firebase';
import { setRoute } from './route';

export const INIT_USER = 'userReducer/INIT_USER';
export const INIT_USER_PAGE = 'userReducer/INIT_USER_PAGE';
export const LOAD_USER = 'userReducer/LOAD_USER';
export const LOAD_USER_PAGE = 'userReducer/LOAD_USER_PAGE';
export const SET_IS_NATIVE = 'userReducer/SET_IS_NATIVE';

export const initUser = createAction(INIT_USER);
export const initUserPage = createAction(INIT_USER_PAGE);
export const setIsNative = createAction(SET_IS_NATIVE);

export const loadUser = createAsyncThunk(
  LOAD_USER,
  async ({ hasToken }, { dispatch }) => {
    if (hasToken) {
      const { user } = await api.get({ path: '/user' });
      dispatch(initUser(user));
      dispatch(setRoute('/games'));
    } else {
      const { user } = await firebase.listenRedirect();

      if (!user) return dispatch(setRoute('/'));

      const { email, displayName, photoURL } = user;
      const body = { email, name: displayName, image: photoURL };
      const response = await api.post({ path: '/login', body });

      localStorage.setItem('token', response.token);
      dispatch(initUser(response.user));
      dispatch(setRoute('/games'));
    }
  },
);

export const loadUserPage = createAsyncThunk(
  LOAD_USER_PAGE,
  async (payload, { dispatch }) => {
    const games = await api.get({ path: '/games?type=user&selection=games' });
    const histories = await api.get({ path: '/games?type=user&selection=history' });

    dispatch(initUserPage({ games, histories }));
  },
);

const initState = {
  isLoading: true,
  info: {
    email: '',
    id: '',
    image: '',
    name: '',
  },
  histories: {
    docs: [],
    nextPage: 1,
    hasNextPage: true,
  },
  games:{
    docs: [],
    nextPage: 1,
    hasNextPage: true,
  },
  error: '',
  isInitialized: false,
  isInitializedUserPage: false,
  isNative: false,
};

const pending = loadUser.pending ||
  loadUserPage.pending;

const fulfilled = loadUser.fulfilled ||
  loadUserPage.fulfilled;

const rejected = loadUser.rejected ||
  loadUserPage.rejected;

export default createReducer(initState, {
  [INIT_USER]: (state, action) => {
    state.info = action.payload;
    state.isInitialized = true;
  },
  [INIT_USER_PAGE]: (state, { payload }) => {
    state.games = payload.games;
    state.histories = payload.histories;
    state.isInitializedUserPage = true;
  },
  [SET_IS_NATIVE]: (state, action) => {
    state.isNative = action.payload;
  },
  [pending]: (state, action) => {
    state.isLoading = true;
  },
  [fulfilled]: (state, action) => {
    state.isLoading = false;
  },
  [rejected]: (state, action) => {
    if (action.payload) {
      state.error = action.payload.errorMessage;
      console.error(action.payload.errorMessage);
    } else {
      state.error = action.error.message;
      console.error(action.payload.errorMessage);
    }
  },
});
