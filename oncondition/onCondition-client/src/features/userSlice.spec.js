import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  login,
  logout,
  setUserInfos,
  setCustomCategories,
} from "./userSlice";
import * as authApi from "../api/auth";

jest.mock("../app/store"); // block store circular dependency

const initialState = {
  id: "",
  customCategories: [],
  lastAccessDate: "",
  name: "guest",
};

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("should handle login async thunk", async () => {
  const idToken = "dummy idToken";
  const googleAccessToken = "dummy googleAccessToken";
  const accessToken = { token: "accessToken", exp: 163189644 };
  const refreshToken = { token: "refreshToken", exp: 163199644 };
  const loginDate = new Date().toISOString();
  const spyPostLogin = jest.spyOn(authApi, "postLogin")
    .mockResolvedValueOnce({ accessToken, refreshToken });
  const spyGetUserInfos = jest.spyOn(authApi, "getUserInfos")
    .mockResolvedValueOnce({
      userId: "id",
      customCategories: [],
      lastAccessDate: loginDate,
    });

  const store = configureStore({
    reducer: { user: reducer },
  });

  await store.dispatch(login({ idToken, googleAccessToken }));

  const state = store.getState();

  expect(state.user).toEqual({
    id: "id",
    customCategories: [],
    lastAccessDate: loginDate,
  });

  expect(spyPostLogin).toBeCalledWith(idToken);
  expect(spyGetUserInfos).toBeCalledWith();
});

test("should handle login extra reducer", () => {
  const loginDate = new Date().toISOString();
  const loginAction = login.fulfilled(
    {
      userId: "id", customCategories: [], lastAccessDate: loginDate, name: "guest",
    },
  );

  expect(reducer(initialState, loginAction)).toEqual({
    id: "id",
    customCategories: [],
    lastAccessDate: loginDate,
    name: "guest",
  });
});

test("should handle logout extra reducer", () => {
  const logoutAction = logout.fulfilled();

  expect(reducer(initialState, logoutAction)).toEqual({
    id: null,
    customCategories: [],
    lastAccessDate: null,
    name: "guest",
  });
});

test("should handle setUserInfos", () => {
  const previousState = initialState;

  const updatedDate = new Date().toISOString();
  const updatedInfo = {
    userId: "dummy id",
    customCategories: ["dummy"],
    lastAccessDate: updatedDate,
    name: "dummy",
  };

  expect(reducer(previousState, setUserInfos(updatedInfo))).toEqual({
    id: "dummy id",
    customCategories: ["dummy"],
    lastAccessDate: updatedDate,
    name: "dummy",
  });
});

test("should handle setCustomCategories", () => {
  const previousState = {
    id: "",
    customCategories: [],
    lastAccessDate: "",
    name: "guest",
  };

  expect(reducer(previousState, setCustomCategories(["dummy 2"]))).toEqual({
    id: "",
    customCategories: ["dummy 2"],
    lastAccessDate: "",
    name: "guest",
  });
});
