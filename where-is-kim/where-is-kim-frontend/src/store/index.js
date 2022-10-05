import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
};
