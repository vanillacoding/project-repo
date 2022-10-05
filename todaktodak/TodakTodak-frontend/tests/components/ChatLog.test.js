import React from "react";
import { useSelector } from "react-redux";
import { render } from "@testing-library/react-native";

import ChatLog from "../../components/ChatLog/ChatLog";

import formatDate from "../../utils/getDate";

import {
  TEST_ID,
  TEST_TEXT,
  MOCK_USER_NAME
} from "../../constants/testContents";
import {
  YELLOW,
  FRIEND_CHAT_BACKGROUND
} from "../../constants/color";

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));

describe("<ChatLog />", () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        user: { nickname: MOCK_USER_NAME }
      });
    });
  });
  afterEach(() => {
    useSelector.mockClear();
  });

  it("should render ChatLog text", () => {
    const date = new Date();
    const { getByText } = render(
      <ChatLog
        comment={TEST_TEXT}
        createdAt={date}
        userNickname={MOCK_USER_NAME}
      />
    );

    expect(getByText(TEST_TEXT)).toBeTruthy();
    expect(getByText(MOCK_USER_NAME)).toBeTruthy();
    expect(getByText(formatDate(date))).toBeTruthy();
  });

  it("should current user and chat user same", () => {
    const date = new Date();
    const { getByTestId } = render(
      <ChatLog
        comment={TEST_TEXT}
        createdAt={date}
        userNickname={MOCK_USER_NAME}
      />
    );

    const chatWrapper = getByTestId(TEST_ID);
    const chatBackgroundColor = chatWrapper.props.style.backgroundColor;

    expect(chatBackgroundColor).toBe(YELLOW);
  });

  it("should current user and chat user different", () => {
    const date = new Date();
    const FRIEND_USER_NAME = "friend";
    const { getByTestId } = render(
      <ChatLog
        comment={TEST_TEXT}
        createdAt={date}
        userNickname={FRIEND_USER_NAME}
      />
    );

    const chatWrapper = getByTestId(TEST_ID);
    const chatBackgroundColor = chatWrapper.props.style.backgroundColor;

    expect(chatBackgroundColor).toBe(FRIEND_CHAT_BACKGROUND);
  });
});
