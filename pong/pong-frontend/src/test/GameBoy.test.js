import React from "react";
import { render, screen } from "@testing-library/react";
import GameBoy from "../components/gameBoy/GameBoy";
import "@testing-library/jest-dom";

describe("<GameBoy />", () => {
  test("should render default values without props", () => {
    render (
      <GameBoy />
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("GAMEBOY")).toBeInTheDocument();
    expect(screen.getByText("PONG!")).toBeInTheDocument();
  });

  test("should render if child component are given", () => {
    render (
      <GameBoy>
        <div>
          <span>
            I am child for test
          </span>
        </div>
      </GameBoy>
    );

    expect(screen.getByText("I am child for test")).toBeInTheDocument();
  });
});
