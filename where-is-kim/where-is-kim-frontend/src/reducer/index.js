import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";
import team from "./team";
import ui from "./ui";

const userPersistConfig = {
  key: "user",
  storage: storage,
};
const teamPersistConfig = {
  key: "team",
  storage: storage,
};
const uiPersistConfig = {
  key: "ui",
  storage: storage,
};

export default combineReducers({
  user: persistReducer(userPersistConfig, user),
  team: persistReducer(teamPersistConfig, team),
  ui: persistReducer(uiPersistConfig, ui),
});
