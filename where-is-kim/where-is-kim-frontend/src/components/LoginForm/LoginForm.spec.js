import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";

describe("<LoginForm />", () => {
  it("should handle props", () => {
    const mockCallback = jest.fn((e) => e.preventDefault());
    const mockObject = { value: "value", onChange: () => {} };
    const { getByText } = render(
      <BrowserRouter>
        <LoginForm
          email={mockObject}
          password={mockObject}
          onSubmit={mockCallback}
        />
      </BrowserRouter>
    );
    const button = getByText("Login");

    fireEvent.click(button);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
