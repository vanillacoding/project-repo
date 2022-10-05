import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"

import single from "./redux/slices/singlePlaySlice"; 
import multiple from "./redux/slices/multiplaySlice";
import socketMiddleware from "./redux/middleware/socket";

const store = configureStore({
  reducer: {
    single,
    multiple,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat([logger, socketMiddleware()]);
    }

    return getDefaultMiddleware().concat([logger, socketMiddleware()]);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
