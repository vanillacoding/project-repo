import React from "react";
import { render, screen } from "@testing-library/react";

import Portal from "../Portal";

describe("Portal", () => {
  window.scrollTo = jest.fn();

  test("renders Portal component", () => {
    const id = "portal";
    const children = <div data-testid="children">children</div>;

    render(<Portal id={id}>{children}</Portal>);

    expect(document.getElementById(id)).toBeInTheDocument();
    expect(screen.queryByTestId("children")).toBeTruthy();
  });
});
