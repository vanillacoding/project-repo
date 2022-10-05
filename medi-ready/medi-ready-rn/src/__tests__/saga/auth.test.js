import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import userReducer from "../../redux/reducers/userSlice";

import { logoutRequest, authCheck } from "../../api/index";
import { handleLogout, handleAuthCheck } from "../../sagas/handlers/auth";

describe("auth saga test", () => {
  it("logout => ", () => {
    const response = {
      result: "success",
    };

    return expectSaga(handleLogout)
      .withReducer(userReducer)
      .provide([[call(logoutRequest), response]])
      .put({ type: "user/deleteUserInfo", payload: undefined })
      .hasFinalState({
        error: null,
        isLoading: false,
        userInfo: null,
      })
      .silentRun();
  });

  it("auth check => ", () => {
    const response = {
      result: "success",
      data: {
        created_at: "2021-09-18T03:02:51.000Z",
        email: "test@gmail.com",
        name: "test",
        notification_token: "ExponentPushToken[test]",
        picture: "https://test",
        user_id: "test-1234",
      },
    };

    return expectSaga(handleAuthCheck)
      .withReducer(userReducer)
      .provide([[call(authCheck), response]])
      .put({ type: "user/setUserInfo", payload: response.data })
      .hasFinalState({
        error: null,
        isLoading: false,
        userInfo: response.data,
      })
      .silentRun();
  });
});
