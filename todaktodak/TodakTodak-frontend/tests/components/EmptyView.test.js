import React from "react";
import { render } from "@testing-library/react-native";

import EmptyView from "../../components/EmptyView/EmptyView";

import { TEST_TEXT } from "../../constants/testContents";

describe("<EmptyView />", () => {
  it("should render EmptyView text", () => {
    const { getByText } = render(
      <EmptyView text={TEST_TEXT} />
    );
    const EmptyViewText = getByText(TEST_TEXT);

    expect(EmptyViewText).not.toBeNull();
  });
});
