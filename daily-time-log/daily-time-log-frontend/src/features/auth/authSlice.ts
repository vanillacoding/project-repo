import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  isLogIn: boolean;
  isLoading: boolean;
  userId?: string;
  name: string;
  email: string;
  imageUrl: string;
  googleAccessToken: string;
  googleCalendarId: string;
}

interface LoginPayload {
  isLogIn?: boolean;
  isLoading?: boolean;
  userId?: string;
  name?: string;
  email?: string;
  imageUrl: string;
  googleAccessToken?: string;
}

const initialState: LoginState = {
  isLogIn: false,
  isLoading: true,
  userId: "",
  name: "",
  email: "",
  imageUrl: "",
  googleAccessToken: "",
  googleCalendarId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginPayload>) => {
      const { isLogIn, isLoading, email, googleAccessToken, name, imageUrl } = action.payload;

      state.isLogIn = isLogIn;
      state.isLoading = isLoading;
      state.name = name;
      state.email = email;
      state.imageUrl = imageUrl;
      state.googleAccessToken = googleAccessToken;
    },
    logOut: (state) => {
      state.isLogIn = false;
      state.isLoading = false;
      state.userId = "";
      state.name = "";
      state.email = "";
      state.googleAccessToken = "";
      state.googleCalendarId = "";
    },
    setGoogleCalendarId: (state, action) => {
      state.googleCalendarId = action.payload;
    },
  },
});

export const { logIn, logOut, setGoogleCalendarId } = authSlice.actions;

export default authSlice.reducer;
