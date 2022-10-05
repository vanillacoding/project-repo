import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DateController from "../../components/DateController";

describe("<DateController />", () => {
  test("event listener should execute with button pressed", () => {
    const mockFn = jest.fn();
    const { queryByTestId } = render(<DateController onPressButton={mockFn} />);

    const $backButton = queryByTestId("back-button");
    const $forwardButton = queryByTestId("forward-button");

    fireEvent.press($backButton);
    fireEvent.press($forwardButton);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test("month and date should be displayed as same as props", () => {
    const { queryByText } = render(<DateController month={5} date={31} />);

    expect(queryByText("5월 ")).not.toBeNull();
    expect(queryByText("31일")).not.toBeNull();
  });
});
