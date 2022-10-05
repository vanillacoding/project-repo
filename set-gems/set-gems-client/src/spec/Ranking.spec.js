import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Ranking from "../components/Ranking";
import * as rankingHelpers from "../api/ranking";

const mockRanking = [...Array(20)].map((_, i) => ({ _id: `ranker${i}`, name: `ranker${i}`, time: 10 + i }));

describe("Ranking", () => {
  const mockSetRankerStandard = jest.fn();
  let spyGetRanking = null;

  beforeEach(async () => {
    spyGetRanking = jest.spyOn(rankingHelpers, "getRanking").mockImplementation(() => Promise.resolve(mockRanking));

    await act(async () => {
      await render(<Ranking setRankerStandard={mockSetRankerStandard} />);
    });
  });

  afterEach(() => {
    spyGetRanking.mockRestore();
  });

  it("should render ranking", () => {
    expect(screen.getByText("Ranking")).toBeInTheDocument();

    mockRanking.forEach((record) => {
      expect(screen.getByText(`${record.name} ${record.time}초`)).toBeInTheDocument();
    });
  });

  it("should call getRanking", () => {
    const spyGetRanking = jest.spyOn(rankingHelpers, "getRanking");
    expect(spyGetRanking).toBeCalledTimes(1);
  });

  it("should call setRankerStandard if ranking.length is 20", async () => {
    const mockRankingStandard = mockRanking[mockRanking.length - 1].time;

    expect(mockSetRankerStandard).toBeCalledTimes(1);
    expect(mockSetRankerStandard).toBeCalledWith(mockRankingStandard);
  });
});
