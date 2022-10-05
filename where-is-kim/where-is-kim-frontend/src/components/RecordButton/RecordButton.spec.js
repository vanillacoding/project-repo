import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RecordButton from "./RecordButton";

describe("<RecordButton />", () => {
  it("should handle props", () => {
    const mockCallback = jest.fn();
    const { getByText, rerender } = render(
      <RecordButton text="sample" onClick={mockCallback} isDisabled={false} />
    );
    const button = getByText("sample");

    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(1);
    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(2);

    rerender(<RecordButton isDisabled={true} />);

    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(2);
  });
});
