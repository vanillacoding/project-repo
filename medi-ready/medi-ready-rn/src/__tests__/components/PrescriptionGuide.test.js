import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import PrescriptionGuide from "../../components/shared/PrescriptionGuide";

describe("Prescription Guide test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders prescription guide", () => {
    const props = {
      description: "약 잘 먹고 잘 쉬세요!",
    };

    const { getByText } = render(<PrescriptionGuide {...props} />);

    const description = getByText("약 잘 먹고 잘 쉬세요!");

    expect(description).toBeTruthy();
  });
});
