import React from "react";
import { render } from "@testing-library/react-native";

import Category from "../../components/Category/Category";

import { TEST_TEXT } from "../../constants/testContents";

describe("<Category />", () => {
  it("should render category title", () => {
    const { getByText } = render(
      <Category title={TEST_TEXT} />
    );
    const CategoryText = getByText(TEST_TEXT);

    expect(CategoryText).not.toBeNull();
  });
});
