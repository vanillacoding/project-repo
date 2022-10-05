import authReducer from "./authReducer";
import roomReducer from "./roomReducer";
import imageReducer from "./imageReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  authReducer,
  roomReducer,
  imageReducer,
});

export default reducer;
