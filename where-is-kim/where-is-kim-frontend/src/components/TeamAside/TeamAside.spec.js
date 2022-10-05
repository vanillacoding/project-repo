import React from "react";
import { render } from "@testing-library/react";
import TeamAside from "./TeamAside";
import { BrowserRouter } from "react-router-dom";

describe("<TeamAside />", () => {
  it("should handle props", () => {
    const teamName = "watcha";
    const teamPic = "watcha.jpg";

    const { getByText, container } = render(
      <BrowserRouter>
        <TeamAside teamPic={teamPic} teamName={teamName} participants={[]} />
      </BrowserRouter>
    );
    const img = container.querySelector(`img[alt="${teamName}"]`);

    getByText(teamName);
    expect(img.getAttribute("src")).toBe(teamPic);
  });
});
