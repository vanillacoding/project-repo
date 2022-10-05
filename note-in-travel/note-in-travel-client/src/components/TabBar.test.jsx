import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";

import TabBar from "./TabBar";

describe(">>> COMPONENT --- TAB BAR", () => {
  const mockNavigate = jest.fn();
  const mockOnActiveButtonPress = jest.fn();
  const mockOnActiveButtonLongPress = jest.fn();

  const createTestProps = (props, stateProps) => ({
    navigation: {
      navigate: mockNavigate,
    },
    state: {
      routeNames: ["Home", "User", "CourseDetail"],
      ...stateProps,
    },
    ...props,
  });

  afterEach(() => {
    cleanup();
    mockNavigate.mockClear();
    mockOnActiveButtonPress.mockClear();
    mockOnActiveButtonLongPress.mockClear();
  });

  it("+++ renders TabBar component", () => {
    const props = createTestProps({}, { index: 0 });
    const { queryByTestId } = render(<TabBar {...props} />);

    const homeTab = queryByTestId("homeTab");
    const userTab = queryByTestId("userTab");
    const activeButton = queryByTestId("activeButton");

    expect(homeTab).toBeTruthy();
    expect(userTab).toBeTruthy();
    expect(activeButton).toBeNull();
  });

  it("+++ render active button only in CourseDetail route", () => {
    const props = createTestProps({}, { index: 2 });
    const { queryByTestId } = render(<TabBar {...props} />);

    const homeTab = queryByTestId("homeTab");
    const userTab = queryByTestId("userTab");
    const activeButton = queryByTestId("activeButton");

    expect(homeTab).toBeTruthy();
    expect(userTab).toBeTruthy();
    expect(activeButton).toBeTruthy();
  });

  it("+++ should navigate to route", () => {
    const props = createTestProps({}, { index: 0 });
    const { queryByTestId } = render(<TabBar {...props} />);

    const homeTab = queryByTestId("homeTab");
    const userTab = queryByTestId("userTab");

    fireEvent.press(homeTab);
    fireEvent.press(userTab);

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "Home");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "User");
  });

  it("+++ press and longPress is available in active mode", () => {
    const props = createTestProps(
      {
        isActiveMode: true,
        onActiveButtonPress: mockOnActiveButtonPress,
        onActiveButtonLongPress: mockOnActiveButtonLongPress,
      },
      { index: 2 },
    );
    const { queryByTestId } = render(<TabBar {...props} />);

    const activeButton = queryByTestId("activeButton");

    fireEvent(activeButton, "onLongPress");
    fireEvent(activeButton, "onPress");

    expect(mockOnActiveButtonLongPress).toHaveBeenCalled();
    expect(mockOnActiveButtonPress).toHaveBeenCalled();
  });

  it("+++ only press is available in active mode", () => {
    const props = createTestProps(
      {
        isActiveMode: false,
        onActiveButtonPress: mockOnActiveButtonPress,
        onActiveButtonLongPress: mockOnActiveButtonLongPress,
      },
      { index: 2 },
    );
    const { queryByTestId } = render(<TabBar {...props} />);

    const activeButton = queryByTestId("activeButton");

    fireEvent(activeButton, "onLongPress");
    expect(mockOnActiveButtonLongPress).toHaveBeenCalledTimes(1);

    try {
      fireEvent.press(activeButton);
    } catch (err) {
      // eslint-disable-next-line quotes
      expect(err.message).toEqual('No handler function found for event: "press"');
    } finally {
      expect(mockOnActiveButtonPress).toHaveBeenCalledTimes(0);
    }
  });
});
