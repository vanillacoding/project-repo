import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import LogoutScreen from "../../screens/LogoutScreen";

describe("<LogoutScreen />", () => {
  test("snapshot test", () => {
    const component = renderer.create(<LogoutScreen />);

    expect(component).toMatchSnapshot();
  });

  test("indicator text should be rendered", () => {
    const { queryByText } = render(<LogoutScreen />);

    expect(queryByText("Logout")).not.toBeNull();
  });
});
