import React from "react";
import { screen } from "@testing-library/react";

import Prescription from "../pages/Prescription";
import { customRender } from "../setupTests";

describe("<Prescription />", () => {
  it("matches snapshot", () => {
    const { container } = customRender(<Prescription />);

    expect(container).toMatchSnapshot();
  });

  it("should render searchForm", () => {
    customRender(<Prescription />);

    expect(screen.getByPlaceholderText("약 검색어를 입력해주세요.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("복용지도를 입력해주세요.")).toBeInTheDocument();
  });
});
