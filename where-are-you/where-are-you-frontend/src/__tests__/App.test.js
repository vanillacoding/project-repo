import React from "react";

import { screen } from "@testing-library/react";

import App from "../components/App";
import { customRender, history } from "../setupTests";

describe("Main", () => {
  it("matches snapshot", () => {
    const { container } = customRender(<App />);

    expect(container).toMatchSnapshot();
  });

  it("should go to '/' when initial rendering", () => {
    const { container } = customRender(<App />);
    const mainImage = screen.getByAltText("게임 메인 이미지");

    expect(container).toContainElement(mainImage);
  });

  it("should go to NotFound page with wrong path", () => {
    customRender(<App />);
    history.push("/notfound");

    const button = screen.getByText("메인으로 가기");

    expect(button).toBeInTheDocument();
  });
});
