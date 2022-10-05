import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import AlertModal from "../../components/AlertModal/AlertModal";

import { TEST_TEXT } from "../../constants/testContents";

describe("<AlertModal />", () => {
  it("should render AlertModal text", () => {
    const { getByText } = render(
      <AlertModal message={TEST_TEXT} />
    );
    const AlertModalText = getByText(TEST_TEXT);

    expect(AlertModalText).not.toBeNull();
  });

  it("should press modal closingButton", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <AlertModal message={TEST_TEXT} handleModalClose={onPressMock} />
    );

    fireEvent.press(getByText("닫기"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
