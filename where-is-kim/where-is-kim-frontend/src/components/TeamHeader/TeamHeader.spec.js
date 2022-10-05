import React from "react";
import { render } from "@testing-library/react";
import TeamHeader from "./TeamHeader";
import { BrowserRouter } from "react-router-dom";

describe("<TeamHeader />", () => {
  it("should handle props", () => {
    const teamName = "watcha";
    const currentPage = "Lobby";
    const { getByText, container } = render(
      <BrowserRouter>
        <TeamHeader teamName={teamName} currentPage={currentPage} />
      </BrowserRouter>
    );

    const lis = container.querySelectorAll("nav li");

    getByText(currentPage);

    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const link = li.querySelector("a");

      expect(link.getAttribute("href")).toMatch(teamName);
    }
  });
});
