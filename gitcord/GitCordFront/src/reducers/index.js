import { combineReducers } from "redux";

import roomReducer from "./roomReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  roomReducer,
  userReducer
});

export default rootReducer;
