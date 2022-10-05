import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FormField from "./FormField";

describe("<FormField />", () => {
  it("should handle props", () => {
    const eventValidator = { text: "" };
    const onChange = (e) => {
      const value = e.target.value;
      eventValidator.text = value;
    };
    const {
      getByDisplayValue,
      getByPlaceholderText,
      getByText,
      container,
    } = render(
      <FormField
        title="Your name"
        type="text"
        placeholder="Type your full name"
        controller={{ value: "jeong", onChange }}
      />
    );

    const input = getByDisplayValue("jeong");

    getByText("Your name");
    container.querySelector('input[type="text"]');
    getByPlaceholderText("Type your full name");
    fireEvent.change(input, { target: { value: "hello" } });
    expect(eventValidator).toEqual({ text: "hello" });
  });
});
