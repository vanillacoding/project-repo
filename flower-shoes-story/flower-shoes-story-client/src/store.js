import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import userReducer from "./features/userSlice";
import preloadReducer from "./features/preloadSlice";

const reducers = combineReducers({
  user: userReducer,
  preload: preloadReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [logger],
});

export default store;
