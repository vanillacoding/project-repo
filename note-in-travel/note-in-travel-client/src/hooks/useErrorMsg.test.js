import React from "react";
import { act, create } from "react-test-renderer";

import MockedNavigator from "../../testing/MockedNavigator";
import useErrorMsg from "./useErrorMsg";

describe(">>> HOOK --- USE ERROR MSG", () => {
  function setup(...args) {
    const returnVal = {};

    function TestComponent() {
      Object.assign(returnVal, useErrorMsg(...args));
      return null;
    }

    create(<MockedNavigator component={TestComponent} />);
    return returnVal;
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("+++ flash error message during delay time", () => {
    const errorMsgData = setup("error", 1000);

    expect(errorMsgData.errorMsg).toBe("error");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(errorMsgData.errorMsg).toBe(null);
  });

  it("+++ set error message", () => {
    const errorMsgData = setup(null, 1000);

    expect(errorMsgData.errorMsg).toBe(null);

    act(() => {
      errorMsgData.setErrorMsg("new error");
    });

    expect(errorMsgData.errorMsg).toBe("new error");

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(errorMsgData.errorMsg).toBe(null);
  });
});
