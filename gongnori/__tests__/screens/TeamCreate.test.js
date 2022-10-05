import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import TeamCreateScreen from "../../screens/TeamCreateScreen";
import store from "../../store/store";

describe("<TeamCreateScreen />", () => {
  test("snapshot test", () => {
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

    const component = renderer.create(
      <Provider store={store}>
        <TeamCreateScreen
          navigation={navigation}
        />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
