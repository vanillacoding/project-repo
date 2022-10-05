import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

import * as types from "./constants/actionTypes";
import reducer from "./reducers";

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  const logger = createLogger({
    predicate: (getState, action) => action.type !== types.COUNT_CLEARTIME
  });
  middleware.push(logger);
}

export const store = createStore(reducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

export default { store, persistor };
