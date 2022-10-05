import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";

import withRedux from "../../testing/withRedux";
import ScheduleList from "./ScheduleList";

describe(">>> COMPONENT --- SCHEDULE LIST", () => {
  const mockOnChange = jest.fn();

  const firstSite = {
    _id: 1,
    fullName: "full name of site 1",
    shortName: "short name of site 1",
  };
  const secondSite = {
    _id: 2,
    fullName: "full name of site 2",
    shortName: "short name of site 2",
  };
  const schedules = [{ index: 1, site: firstSite }, { index: 2, site: secondSite }];
  const changedSchedules = [{ index: 1, site: secondSite }, { index: 2, site: firstSite }];

  const createTestProps = () => ({
    schedules,
    onChange: mockOnChange,
  });

  afterEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it("+++ renders ScheduleList component", () => {
    const props = createTestProps();
    const { queryByText } = render(withRedux(<ScheduleList {...props} />));

    const firstButton = queryByText("1");
    const secondButton = queryByText("2");

    expect(firstButton).toBeTruthy();
    expect(secondButton).toBeTruthy();
  });

  it("+++ call onChange with swaped scheduls", () => {
    const props = createTestProps();
    const { queryByText } = render(withRedux(<ScheduleList {...props} />));

    const firstButton = queryByText("1");
    const secondButton = queryByText("2");

    fireEvent.press(firstButton);
    fireEvent.press(firstButton);

    expect(mockOnChange).toHaveBeenCalledTimes(0);

    fireEvent.press(firstButton);
    fireEvent.press(secondButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(changedSchedules);
  });
});
