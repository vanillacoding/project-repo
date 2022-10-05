import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SideButton from "../../components/SideButton";

describe("<SideButton />", () => {
  test("event listener should execute with button pressed", () => {
    const mockFn = jest.fn();

    const navigation = {
      "addListener": mockFn,
      "canGoBack": mockFn,
      "dangerouslyGetParent": mockFn,
      "dangerouslyGetState": mockFn,
      "dispatch": mockFn,
      "goBack": mockFn,
      "isFocused": mockFn,
      "navigate": mockFn,
      "pop": mockFn,
      "popToTop": mockFn,
      "push": mockFn,
      "removeListener": mockFn,
      "replace": mockFn,
      "reset": mockFn,
      "setOptions": mockFn,
      "setParams": mockFn,
    };

    const { queryByTestId } = render(
      <SideButton
        navigation={navigation}
        path={"MatchCreate"}
        isRank={true}
      />
    );

    const $touchableOpacity = queryByTestId("touchable-opactiy");

    fireEvent.press($touchableOpacity);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
