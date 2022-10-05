import React from "react";

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Main from "../components/Main";
import { customRender } from "../setupTests";

describe("Main", () => {
  it("matches snapshot", () => {
    const { container } = customRender(<Main />);

    expect(container).toMatchSnapshot();
  });

  it("should show validation text if input is empty", () => {
    customRender(<Main />);
    const button = screen.getByRole("button", { name: "GAME START" });

    userEvent.click(button);

    const validationText = screen.getByText("이름을 입력해주세요.");

    expect(validationText).toBeInTheDocument();
  });
});
