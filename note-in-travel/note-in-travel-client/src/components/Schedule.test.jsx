/* eslint-disable import/first */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { act } from "react-test-renderer";

jest.mock("../utils/fetchData");
import fetchData from "../utils/fetchData";
import withRedux from "../../testing/withRedux";
import Schedule from "./Schedule";

describe(">>> COMPONENT --- SCHEDULE", () => {
  const mockOnIndexPress = jest.fn();

  const schedule = {
    index: 1,
    site: {
      _id: 1,
      fullName: "full name of site 1",
      shortName: "short name of site 1",
    },
  };

  const createTestProps = () => ({
    schedule,
    onIndexPress: mockOnIndexPress,
  });

  fetchData.mockImplementation(() => Promise.resolve(schedule.site));

  afterEach(() => {
    cleanup();
    mockOnIndexPress.mockClear();
    fetchData.mockClear();
  });

  it("+++ renders Schedule component", () => {
    const props = createTestProps();
    const { queryByText, queryByTestId } = render(withRedux(<Schedule {...props} />));

    const indexButton = queryByTestId("indexButton");
    const likeButton = queryByTestId("likeButton");

    expect(indexButton).toBeTruthy();
    expect(likeButton).toBeTruthy();
    expect(queryByText("full name of site 1")).toBeTruthy();
    expect(queryByText("short name of site 1")).toBeTruthy();
  });

  it("+++ call onIndexPress with index of schedule", () => {
    const props = createTestProps();
    const { queryByTestId } = render(withRedux(<Schedule {...props} />));

    const indexButton = queryByTestId("indexButton");

    fireEvent.press(indexButton);

    expect(mockOnIndexPress).toHaveBeenCalledWith(schedule.index);
  });

  it("+++ fetch to different params by depending on isBookmarked", async () => {
    const props = createTestProps();
    const { queryByTestId } = render(withRedux(<Schedule {...props} />));

    const likeButton = queryByTestId("likeButton");

    await act(async () => {
      fireEvent.press(likeButton);
    });

    expect(fetchData).toHaveBeenNthCalledWith(
      1,
      "PATCH",
      `/user/favoriteSites/${schedule.site._id}`,
    );

    await act(async () => {
      fireEvent.press(likeButton);
    });

    expect(fetchData).toHaveBeenNthCalledWith(
      2,
      "DELETE",
      `/user/favoriteSites/${schedule.site._id}`,
    );
  });
});
