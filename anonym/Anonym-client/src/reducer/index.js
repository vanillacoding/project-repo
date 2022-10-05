import { combineReducers } from "redux";
import auth from "./auth";
import streaming from "./streaming";
import search from "./search";

const reducer = combineReducers({
  auth,
  streaming,
  search,
});

export default reducer;
