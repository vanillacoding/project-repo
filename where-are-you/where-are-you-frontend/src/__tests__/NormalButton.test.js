import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NormalButton from "../components/Shared/NormalButton";
import { customRender } from "../setupTests";

describe("NormalButton", () => {
  it("matches snapshot", () => {
    const { container } = customRender(
      <NormalButton title="버튼" color="black" handleClick={() => "click"} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should fire event", () => {
    jest.spyOn(global.console, "log");
    customRender(
      <NormalButton title="button" color="black" handleClick={() => console.log("click")} />
    );

    const button = screen.getByRole("button", { name: "button" });

    userEvent.click(button);

    expect(console.log).toHaveBeenCalledWith("click");
  });
});
