import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Welcome from "../pages/Welcome";

describe("Welcome page", () => {
  const mockHandleSelectMode = jest.fn();

  beforeEach(async () => {
    render(<Welcome onSelectMode={mockHandleSelectMode} />);
  });

  it("should render guide and mode buttons", () => {
    expect(screen.getByText("SET GEMS")).toBeInTheDocument();
    expect(screen.getByText("카드 조합 해보기")).toBeInTheDocument();
    expect(screen.getByText("혼자하기")).toBeInTheDocument();
    expect(screen.getByText("같이하기")).toBeInTheDocument();
  });

  it("should set single mode if click single button", async () => {
    const $singleButton = screen.getByText("혼자하기");

    fireEvent.click($singleButton);

    expect(mockHandleSelectMode).toHaveBeenCalledWith("single mode");
  });

  it("should set multi mode if click multi button", async () => {
    const $multiButton = screen.getByText("같이하기");

    fireEvent.click($multiButton);

    expect(mockHandleSelectMode).toHaveBeenCalledWith("multi mode");
  });
});
