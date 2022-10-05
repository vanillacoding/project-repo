import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "../features/userSlice";
import errorSlice from "../features/errorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
