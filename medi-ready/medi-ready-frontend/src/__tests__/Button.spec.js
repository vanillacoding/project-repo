import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { customRender } from "../setupTests";
import Button from "../components/Shared/Button";

describe("<Button />", () => {
  it("matches snapshot", () => {
    const { container } = customRender(
      <Button type="button" onClick={() => console.log("test")}>test</Button>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render without crashing", () => {
    const { getByText } = customRender(
      <Button type="button" onClick={() => console.log("test")}>test</Button>,
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  it("should occur an event", () => {
    jest.spyOn(global.console, "log");

    customRender(
      <Button type="button" onClick={() => console.log("click")}>test</Button>,
    );

    const button = screen.getByText("test");

    userEvent.click(button);

    expect(console.log).toHaveBeenCalledWith("click");
  });
});
