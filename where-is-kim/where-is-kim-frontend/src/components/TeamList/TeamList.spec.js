import React from "react";
import { render } from "@testing-library/react";
import TeamList from "./TeamList";
import { BrowserRouter } from "react-router-dom";

describe("<TeamList />", () => {
  it("should handle props", () => {
    const team = [
      { id: "teamId1", name: "vanilla_coding", displayName: "vanilla coding" },
      { id: "teamId2", name: "watcha", displayName: "watcha" },
    ];
    const { getByText } = render(
      <BrowserRouter>
        <TeamList teams={team} />
      </BrowserRouter>
    );

    for (let i = 0; i < team.length; i++) {
      const displayName = team[i].displayName;
      const name = team[i].name;
      const link = getByText(displayName);

      expect(link.getAttribute("href")).toMatch(name);
    }
  });
});
