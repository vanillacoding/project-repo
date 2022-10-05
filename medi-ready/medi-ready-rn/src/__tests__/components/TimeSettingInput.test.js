import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, cleanup } from "@testing-library/react-native";

import store from "../../redux/store/index";
import TimeSettingInput from "../../components/TimeSettingInput";

describe("Time Setting Input test", () => {
  afterEach(() => {
    cleanup();
  });

  const props = {
    dosePeriod: "morning",
    dosePeriodTitle: "아침",
    alarmTime: "08:00",
  };

  it("should show new time depending on its input", () => {
    const component = (
      <Provider store={store}>
        <TimeSettingInput {...props} />
      </Provider>
    );

    const { getByTestId, getByPlaceholderText } = render(component);

    const hourInput = getByTestId("hour-input");
    fireEvent.changeText(hourInput, "07");

    const minuteInput = getByTestId("minute-input");
    fireEvent.changeText(minuteInput, "30");

    const hourPlaceHolder = getByPlaceholderText("07");
    const minutePlaceHolder = getByPlaceholderText("30");

    expect(hourPlaceHolder).toBeTruthy();
    expect(minutePlaceHolder).toBeTruthy();
  });

  it("should show error message for wrong hour input", () => {
    const component = (
      <Provider store={store}>
        <TimeSettingInput {...props} />
      </Provider>
    );

    const { getByTestId } = render(component);

    const hourInput = getByTestId("hour-input");
    fireEvent.changeText(hourInput, "27");

    expect(getByTestId("error-text").props.children).toBe(
      "24시 이전만 입력해 주세요",
    );
  });

  it("should show error message for wrong minute input", () => {
    const component = (
      <Provider store={store}>
        <TimeSettingInput {...props} />
      </Provider>
    );

    const { getByTestId } = render(component);

    const hourInput = getByTestId("hour-input");
    fireEvent.changeText(hourInput, "07");

    const minuteInput = getByTestId("minute-input");
    fireEvent.changeText(minuteInput, "80");

    expect(getByTestId("error-text").props.children).toBe(
      "60분 이전만 입력해 주세요",
    );
  });
});
