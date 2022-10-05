import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import interviewees, { intervieweeSaga } from "./interviewees";
import projects, { projectsSaga } from "./projects";
import user, { userSaga } from "./user";

const appReducer = combineReducers({
  user,
  projects,
  interviewees,
});

const rootReducer = (state, action) => {
  let appState = state;
  if (action.type === "LOGOUT") {
    appState = undefined;
  }

  return appReducer(appState, action);
};

export function* rootSaga() {
  yield all([userSaga(), projectsSaga(), intervieweeSaga()]);
}

export default rootReducer;
