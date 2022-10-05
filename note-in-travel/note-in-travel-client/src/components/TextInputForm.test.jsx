import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";

import TextInputForm from "./TextInputForm";

describe(">>> COMPONENT --- TEXT INPUT FORM", () => {
  const mockSubmit = jest.fn();
  const mockClose = jest.fn();

  afterEach(() => {
    cleanup();
    mockSubmit.mockClear();
    mockClose.mockClear();
  });

  it("+++ renders TextInputForm Component", () => {
    const { queryByTestId, queryByPlaceholderText } = render(
      <TextInputForm placeholder="text input form" />,
    );

    const textInput = queryByPlaceholderText("text input form");
    const saveButton = queryByTestId("saveButton");
    const closeButton = queryByTestId("closeButton");

    expect(textInput).toBeTruthy();
    expect(saveButton).toBeTruthy();
    expect(closeButton).toBeTruthy();
  });

  it("+++ should not submit if textInput is empty", () => {
    const { queryByTestId, queryByPlaceholderText } = render(
      <TextInputForm
        placeholder="text input form"
        onSubmit={mockSubmit}
        onClose={mockClose}
      />,
    );

    const textInput = queryByPlaceholderText("text input form");
    const saveButton = queryByTestId("saveButton");
    const closeButton = queryByTestId("closeButton");

    fireEvent.press(saveButton);

    expect(mockSubmit).toHaveBeenCalledTimes(0);

    fireEvent.changeText(textInput, "input text");
    fireEvent.press(saveButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith("input text");

    fireEvent.press(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
