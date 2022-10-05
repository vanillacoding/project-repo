import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Button from "../Button";
import { lightTheme } from "../../../assets/styles/theme";

describe("Button", () => {
  const children = "button";

  test("renders Button component", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Button size="medium">{children}</Button>
      </ThemeProvider>,
    );

    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("calls the onClick callback handler", async () => {
    const onClick = jest.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <Button size="medium" onClick={onClick}>
          {children}
        </Button>
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
