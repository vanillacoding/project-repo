import React from "react";
import { render, screen } from "@testing-library/react";
import DrawingHistoryButton from "../../components/DrawingHistoryButton";

describe("DrawingHistoryButton", () => {
  it("show button name", () => {
    render(<DrawingHistoryButton />);

    const undoButton = screen.getByRole("button", {
      name: "undo",
    });
    const redoButton = screen.getByRole("button", {
      name: "redo",
    });
    const clearButton = screen.getByRole("button", {
      name: "clear",
    });

    expect(undoButton).toHaveTextContent("undo");
    expect(redoButton).toHaveTextContent("redo");
    expect(clearButton).toHaveTextContent("clear");
  });
});
