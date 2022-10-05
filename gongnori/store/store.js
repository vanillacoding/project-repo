import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { NODE_ENV } from "@env";
import reducer from "../reducers/reducer";

const middleware = [thunk];

if (NODE_ENV === "development") {
  middleware.push(createLogger());
}

export default store = createStore(reducer, applyMiddleware(...middleware));
