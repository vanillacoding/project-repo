import { combineReducers } from "redux";
import user from "./user";
import roomMatch from "./roomMatch";

export default combineReducers({
  roomMatch,
  user,
});
