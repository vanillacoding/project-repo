import React from "react";
import dayjs from "dayjs";
import { render, cleanup } from "@testing-library/react-native";

import HistoryStatus from "../../components/shared/HistoryStatus";

describe("History Status Component Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders 'expired' depending on date", () => {
    const progressDate = dayjs().add(1, "day").format("YYYY.MM.DD");

    const props = {
      expirationDate: progressDate,
      isDeleted: true,
    };

    const { getByText } = render(<HistoryStatus {...props} />);

    const status = getByText("Expired");
    expect(status).toBeTruthy();
  });

  it("renders 'progress' depending on date", () => {
    const progressDate = dayjs().add(1, "day").format("YYYY.MM.DD");

    const props = {
      expirationDate: progressDate,
      isDeleted: false,
    };

    const { getByText } = render(<HistoryStatus {...props} />);

    const status = getByText("Progress");
    expect(status).toBeTruthy();
  });

  it("renders 'expired' depending on status deleted", () => {
    const progressDate = dayjs().subtract(1, "day").format("YYYY.MM.DD");

    const props = {
      expirationDate: progressDate,
      isDeleted: false,
    };

    const { getByText } = render(<HistoryStatus {...props} />);

    const status = getByText("Expired");
    expect(status).toBeTruthy();
  });

  it("renders 'progress' depending on status deleted", () => {
    const progressDate = dayjs().add(1, "day").format("YYYY.MM.DD");

    const props = {
      expirationDate: progressDate,
      isDeleted: false,
    };

    const { getByText } = render(<HistoryStatus {...props} />);

    const status = getByText("Progress");
    expect(status).toBeTruthy();
  });
});
