import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./reducers/userSlice";
import roomReducer from "./reducers/roomSlice";
import mailReducer from "./reducers/mailSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    mail: mailReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat(logger);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});
