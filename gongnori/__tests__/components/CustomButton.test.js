import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../../components/CustomButton";

describe("<CustomButton />", () => {
  test("event listener should execute with button pressed once", () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(<CustomButton onPress={mockFn} />);
    const customButton = getByTestId("custom-button");

    fireEvent.press(customButton);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("button should have a title as same as props", () => {
    const { queryByText } = render(<CustomButton title={"Press!"} />);

    expect(queryByText("Press!")).not.toBeNull();
  });
});
