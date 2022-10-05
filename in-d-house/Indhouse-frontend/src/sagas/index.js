import { all, call } from "redux-saga/effects";

import userAuthSagas from "./userAuth.saga";
import userProfileSagas from "./userProfile.saga";

export default function* saga() {
  yield all([
    call(userAuthSagas),
    call(userProfileSagas),
  ]);
}
