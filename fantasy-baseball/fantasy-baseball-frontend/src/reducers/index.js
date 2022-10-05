import { combineReducers } from "redux";

import login from "./login";
import modal from "./modal";
import todayGame from "./todayGame";

const reducers = combineReducers({
  login,
  todayGame,
  modal,
});

export default reducers;
