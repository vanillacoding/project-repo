import { combineReducers } from "redux";
import app from "./appReducer";
import error from "./errorReducer";
import loading from "./loadingReducer";
import user from "./userReducer";

const reducer = combineReducers(
  {
    app,
    error,
    loading,
    user,
  }
);

export default reducer;
