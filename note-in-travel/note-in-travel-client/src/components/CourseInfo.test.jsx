import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import withRedux from "../../testing/withRedux";
import CourseInfo from "./CourseInfo";

describe(">>> COMPONENT --- COURSE INFO", () => {
  const mockOnBookmarkPress = jest.fn();

  const preloadedState = {
    user: {
      value: { _id: 1 },
    },
    favoriteCourses: {
      items: [{
        _id: 2,
        name: "여행일정",
        creator: {
          _id: 2,
          name: "다른사람",
        },
      }],
    },
  };

  const createTestProps = (props) => ({
    awardPoint: 10,
    onBookmarkPress: mockOnBookmarkPress,
    ...props,
  });

  afterEach(() => {
    cleanup();
    mockOnBookmarkPress.mockClear();
  });

  it("+++ renders CourseInfo component", () => {
    const props = createTestProps(
      {
        courseInfo: {
          _id: 2,
          name: "여행일정",
          creator: {
            _id: 2,
            name: "다른사람",
          },
        },
      },
    );
    const { queryByText, queryByTestId } = render(
      withRedux(<CourseInfo {...props} />, { preloadedState }),
    );

    const awardPoint = queryByTestId("awardPoint");
    const courseName = queryByText("여행일정");
    const creatorName = queryByText(" by 다른사람");
    const bookmarkButton = queryByTestId("bookmarkButton");

    expect(awardPoint).toBeTruthy();
    expect(courseName).toBeTruthy();
    expect(creatorName).toBeTruthy();
    expect(bookmarkButton).toBeTruthy();
  });

  it("+++ shold not render bookmark button if course is mine", () => {
    const props = createTestProps(
      {
        courseInfo: {
          _id: 1,
          name: "나의 여행일정",
          creator: {
            _id: 1,
            name: "김성진",
          },
        },
      },
    );
    const { queryByTestId } = render(withRedux(<CourseInfo {...props} />, { preloadedState }));

    const bookmarkButton = queryByTestId("bookmarkButton");

    expect(bookmarkButton).toBeNull();
  });

  it("+++ bookmark button is available", () => {
    const props = createTestProps(
      {
        courseInfo: {
          _id: 2,
          name: "여행일정",
          creator: {
            _id: 2,
            name: "다른사람",
          },
        },
      },
    );
    const { queryByTestId } = render(
      withRedux(<CourseInfo {...props} />, { preloadedState }),
    );

    const bookmarkButton = queryByTestId("bookmarkButton");

    fireEvent.press(bookmarkButton);

    expect(mockOnBookmarkPress).toHaveBeenCalledTimes(1);
  });
});
