import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import LocationScreen from "../../screens/LocationScreen";
import store from "../../store/store";

describe("<LocationScreen />", () => {
  test("snapshot test", () => {
    const component = renderer.create(
      <Provider store={store}>
        <LocationScreen />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  test("indicator text should be rendered", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <LocationScreen />
      </Provider>
    );

    expect(queryByText("동네 두개를 골라주세요")).not.toBeNull();
    expect(queryByText("동네 1")).not.toBeNull();
    expect(queryByText("동네 2")).not.toBeNull();
    expect(queryByText("등록하기")).not.toBeNull();
  });
});
