import ui, { initialState } from "./ui";
import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
} from "../constants";

describe("ui reducer", () => {
  it("should handle initial state", () => {
    expect(ui(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_TOKEN_PENDING", () => {
    expect(ui(initialState, { type: GET_TOKEN_PENDING })).toEqual(
      Object.assign(initialState, {
        lobby: { isLogin: false, isLoading: true },
      })
    );
  });

  it("should handle GET_TOKEN_SUCCESS", () => {
    expect(ui(initialState, { type: GET_TOKEN_SUCCESS })).toEqual(
      Object.assign(initialState, {
        lobby: { isLogin: true, isLoading: false },
      })
    );
  });

  it("should handle GET_TOKEN_FAILURE", () => {
    expect(ui(initialState, { type: GET_TOKEN_FAILURE })).toEqual(
      Object.assign(initialState, {
        lobby: { isLogin: false, isLoading: false },
      })
    );
  });
});
