import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import MedicineList from "../../components/shared/MedicineList";

describe("Medicine List Component Test", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all medicine List", () => {
    const props = {
      medicines: [
        {
          medicine_id: 1,
          medicine_detail: {
            itemName: "타이레놀",
          },
        },
        {
          medicine_id: 2,
          medicine_detail: {
            itemName: "후시딘",
          },
        },
        {
          medicine_id: 3,
          medicine_detail: {
            itemName: "항셍제",
          },
        },
      ],
    };

    const { getByText } = render(<MedicineList {...props} />);

    const firstMedicine = getByText("타이레놀");
    const secondMedicine = getByText("후시딘");
    const thirdMedicine = getByText("항셍제");

    expect(firstMedicine).toBeTruthy();
    expect(secondMedicine).toBeTruthy();
    expect(thirdMedicine).toBeTruthy();
  });
});
