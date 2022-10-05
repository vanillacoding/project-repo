import React from "react";
import { render, screen } from "@testing-library/react";
import Score from "../components/score/Score";
import "@testing-library/jest-dom";

describe("<Score />", () => {
  test("should render with user and partnerScore", () => {
    render (
      <Score
        isModerator={true}
        userScore={2}
        partnerScore={1}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("PANDA")).toBeInTheDocument();
    expect(screen.getByText("BEAR")).toBeInTheDocument();
  });
});
