import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Single from "../pages/Single";

describe("Single Mode", () => {
  const handleHomeButtonClick = jest.fn();

  beforeEach(() => {
    render(<Single onHomeButtonClick={handleHomeButtonClick} />);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should render title, Ranking and buttons", () => {
    expect(screen.getByText("혼자하기")).toBeInTheDocument();
    expect(screen.getByText("Ranking")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("START")).toBeInTheDocument();
  });

  it("should call onHomeButtonClick if home button clicked", () => {
    const $homeButton = screen.getByText("home");

    fireEvent.click($homeButton);

    expect(handleHomeButtonClick).toBeCalledTimes(1);
  });

  it("should start game if start button click", () => {
    const $startButton = screen.getByText("START");

    fireEvent.click($startButton);

    expect(screen.getByText("CANCEL")).toBeInTheDocument();
    expect(screen.getByText("남은 카드 수: 81개")).toBeInTheDocument();
  });

  it("should render seconds after start game", () => {
    jest.useFakeTimers();

    const $startButton = screen.getByText("START");

    fireEvent.click($startButton);

    expect(screen.getByText("0초")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("1초")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("2초")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000 * 10);
    });

    expect(screen.getByText("12초")).toBeInTheDocument();
  });

  it("should back to waiting if cancel button click", () => {
    const $startButton = screen.getByText("START");
    fireEvent.click($startButton);
    const $cancelButton = screen.getByText("CANCEL");
    fireEvent.click($cancelButton);

    expect(screen.getByText("Ranking")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("START")).toBeInTheDocument();
  });
});
