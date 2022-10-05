import authReducer from "./authReducer";
import coinReducer from "./coinReducer";
import cryptofolioReducer from "./cryptofolioReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  authReducer,
  coinReducer,
  cryptofolioReducer,
});

export default reducer;
