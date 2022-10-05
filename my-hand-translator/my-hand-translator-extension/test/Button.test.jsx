import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Button from "../src/components/shared/Button";

describe("Button component test", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("when rendered, text delivered to children should be shown.", () => {
    act(() => {
      render(<Button>테스트</Button>);
    });

    expect(screen.getByText("테스트")).toBeInTheDocument();
  });

  test("the event handler delivered to the props should be called.", () => {
    const mockFn = jest.fn();
    act(() => {
      render(<Button onClick={mockFn}>테스트</Button>);
    });

    expect(screen.getByText("테스트")).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "테스트" });

    fireEvent.click(button);
    expect(mockFn).toBeCalledTimes(1);
    fireEvent.click(button);
    expect(mockFn).toBeCalledTimes(2);
  });
});
