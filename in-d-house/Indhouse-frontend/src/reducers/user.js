import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const reducers = {
  requestFailure: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  localLoginRequest: state => {
    state.isLoading = true;
  },
  socialLoginRequest: state => {
    state.isLoading = true;
  },
  refreshLoginRequest: state => {
    state.isLoading = true;
  },
  loginSuccess: (state, action) => {
    state.profile = action.payload;
    state.isLoading = false;
  },
  signupRequest: state => {
    state.isLoading = true;
  },
  signupSuccess: state => {
    state.isLoading = false;
  },
  logoutRequest: state => {
    state.isLoading = true;
  },
  logoutSuccess: state => {
    state.profile = null;
    state.isLoading = false;
  },
  editProfileRequest: state => {
    state.isLoading = true;
  },
  editProfileSuccess: (state, action) => {
    state.profile[action.payload.type] = action.payload.data;
    state.isLoading = false;
  },
  chooseGenreRequest: state => {
    state.isLoading = true;
  },
  chooseGenreSuccess: (state, action) => {
    state.isLoading = false;
    state.profile.likeGenre = action.payload;
  },
  musicLikeRequest: state => {
    state.isLoading = true;
  },
  musicLikeSuccess: (state, action) => {
    state.isLoading = false;
    state.profile.likeMusic = [...state.profile.likeMusic, action.payload];
  },
  musicDislikeRequest: state => {
    state.isLoading = true;
  },
  musicDislikeSuccess: (state, action) => {
    state.isLoading = false;
    state.profile.likeMusic = state.profile.likeMusic
      .filter(music => music.musicId !== action.payload.musicId);
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const {
  requestFailure,
  localLoginRequest,
  socialLoginRequest,
  refreshLoginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  signupRequest,
  signupSuccess,
  editProfileRequest,
  editProfileSuccess,
  chooseGenreRequest,
  chooseGenreSuccess,
  musicLikeRequest,
  musicLikeSuccess,
  musicDislikeRequest,
  musicDislikeSuccess,
} = userSlice.actions;

export default userSlice.reducer;
