import React from "react";
import { render } from "@testing-library/react-native";

import Title from "../../components/Title/Title";

import { TEST_TEXT } from "../../constants/testContents";

describe("<Title />", () => {
  it("should render Title text", () => {
    const { getByText } = render(
      <Title text={TEST_TEXT} />
    );
    const TitleText = getByText(TEST_TEXT);

    expect(TitleText).not.toBeNull();
  });
});
