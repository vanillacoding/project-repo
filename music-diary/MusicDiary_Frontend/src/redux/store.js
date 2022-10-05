import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import AsyncStorage from "@react-native-async-storage/async-storage";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { userSlice } from "./slices/userSlice";
import { diarySlice } from "./slices/diarySlice";
import { musicSlice } from "./slices/musicSlice";
import { persistStore, persistReducer } from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  blacklist: ["status", "error", "accessToken"],
};

const musicPersistConfig = {
  key: "music",
  storage: AsyncStorage,
  blacklist: ["playList"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userSlice.reducer),
  diary: diarySlice.reducer,
  music: persistReducer(musicPersistConfig, musicSlice.reducer),
});

const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistedStore = persistStore(store);

export { store, persistedStore };
