import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import reducer, { rootSaga } from "./redux/reducers";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);

export default store;
