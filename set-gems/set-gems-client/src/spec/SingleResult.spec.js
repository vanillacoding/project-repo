import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { SingleResult } from "../components/Result";
import * as rankingHelpers from "../api/ranking";

const mockRankerTime = 20;
const mockNotRankerTime = 40;
const mockRankerStandard = 30;

describe("Single Result", () => {
  it("should not render form if time is longer than rankerStandard", () => {
    const mockHandleSubmit = jest.fn();

    const { container } = render(
      <SingleResult
        time={mockNotRankerTime}
        rankerStandard={mockRankerStandard}
        onSubmit={mockHandleSubmit}
      />,
    );

    expect(container.querySelector("form")).toBeFalsy();
  });

  it("should render form if time is shorter than rankerStandard", () => {
    const mockHandleSubmit = jest.fn();

    const { container } = render(
      <SingleResult
        time={mockRankerTime}
        rankerStandard={mockRankerStandard}
        onSubmit={mockHandleSubmit}
      />,
    );

    expect(container.querySelector("form")).toBeTruthy();
  });

  it("should call postRanking if form submit with nickname", async () => {
    const rankerNickname = "ranker";
    const mockHandleSubmit = jest.fn();
    const spyPostRanking = jest.spyOn(rankingHelpers, "postRanking");

    const { container } = render(
      <SingleResult
        time={mockRankerTime}
        rankerStandard={mockRankerStandard}
        onSubmit={mockHandleSubmit}
      />,
    );

    const $form = container.querySelector("form");

    fireEvent.submit($form, {
      target: { nickname: { value: rankerNickname } },
    });

    const rankData = { time: mockRankerTime, name: rankerNickname };

    expect(spyPostRanking).toHaveBeenCalledTimes(1);
    expect(spyPostRanking).toHaveBeenCalledWith(rankData);
  });
});
