import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomTextInput from "../../components/CustomTextInput";

describe("<CustomTextInput />", () => {
  test("event listener should execute with text changed once", () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(<CustomTextInput
      title={"이름"}
      value={"skunk"}
      placeholder={"이름을 입력해주세요."}
      onChangeText={mockFn}
    />);
    const $textInput = getByPlaceholderText("이름을 입력해주세요.");

    fireEvent.changeText($textInput, "skunk works");

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("button should have a title as same as props", () => {
    const { queryByText } = render(<CustomTextInput title={"이름"} />);

    expect(queryByText("이름")).not.toBeNull();
  });
});
