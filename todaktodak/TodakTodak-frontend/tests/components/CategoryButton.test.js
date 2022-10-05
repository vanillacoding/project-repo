import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { TEST_ID, TEST_TEXT } from "../../constants/testContents";
import { OPACITY_BACKGROUND } from "../../constants/color";

describe("<CategoryButton />", () => {
  it("should render categoryButton text", () => {
    const { getByText } = render(
      <CategoryButton title={TEST_TEXT} />
    );
    const buttonText = getByText(TEST_TEXT);

    expect(buttonText).not.toBeNull();
  });

  it("should press category button", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <CategoryButton text={TEST_TEXT} handleClick={onPressMock} />
    );

    fireEvent.press(getByTestId(TEST_ID));
    expect(onPressMock).toHaveBeenCalled();
  });

  it("should focusValue and title same background color", () => {
    const { getByTestId } = render(
      <CategoryButton
        title={TEST_TEXT}
        focusValue={TEST_TEXT}
        categoryColor="red"
      />
    );
    const activeCategoryButton = getByTestId(TEST_ID);
    const buttonBackgroundColor = activeCategoryButton.props.style.backgroundColor;

    expect(buttonBackgroundColor).toBe("red");
  });

  it("should focusValue and title different background color", () => {
    const { getByTestId } = render(
      <CategoryButton
        title={TEST_TEXT}
        categoryColor="red"
      />
    );
    const activeCategoryButton = getByTestId(TEST_ID);
    const buttonBackgroundColor = activeCategoryButton.props.style.backgroundColor;

    expect(buttonBackgroundColor).toBe(OPACITY_BACKGROUND);
  });
});
