import React from "react";

import { PageTitle, PageContent } from "../components/Base";
import { customRender } from "../setupTests";

describe("base component", () => {
  it("matches snapshot", () => {
    const { container } = customRender(
      <PageTitle>test</PageTitle>,
      <PageContent>test</PageContent>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should show title text", () => {
    const { getByText } = customRender(
      <PageTitle>test</PageTitle>,
    );

    expect(getByText("test")).toBeInTheDocument();
  });

  it("should show content text", () => {
    const { getByText } = customRender(
      <PageContent>test</PageContent>,
    );

    expect(getByText("test")).toBeInTheDocument();
  });
});
