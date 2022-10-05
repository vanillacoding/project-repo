import React from "react";
import { useSelector } from "react-redux";
import { render } from "@testing-library/react-native";

import FriendCard from "../../components/FriendCard/FriendCard";

import {
  MOCK_USER_NAME,
  MOCK_USER_EMAIL,
  MOCK_FRIEND_NAME,
  MOCK_FRIEND_EMAIL,
  MOCK_CHAT_ROOM_ID,
  MOCK_UNREAD_MESSAGE_COUNT
} from "../../constants/testContents";
import {
  FRIEND,
  PENDING,
  RECEIVE_REJECT,
  SENDING_PENDING,
  RECEIVE_PENDING
} from "../../constants/friendStatus";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn()
  })
}));

describe("<FriendCard />", () => {
  const friend = {
    status: FRIEND,
    friendInfo: {
      nickname: MOCK_FRIEND_NAME,
      email: MOCK_FRIEND_EMAIL
    },
    chatRoomId: MOCK_CHAT_ROOM_ID,
    unreadMessageCount: MOCK_UNREAD_MESSAGE_COUNT
  };

  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        user: {
          email: MOCK_USER_EMAIL,
          nickname: MOCK_USER_NAME
        }
      });
    });
  });
  afterEach(() => {
    useSelector.mockClear();
  });

  it("should status is friend", () => {
    const firendChatButtonText = "채팅하기";
    const { getByText } = render(
      <FriendCard friend={friend} />
    );

    expect(getByText(MOCK_UNREAD_MESSAGE_COUNT)).toBeTruthy();
    expect(getByText(firendChatButtonText)).toBeTruthy();
  });

  it("sholud status is sending pending", () => {
    friend.status = SENDING_PENDING;

    const { getByText } = render(
      <FriendCard friend={friend} />
    );

    expect(getByText(PENDING)).toBeTruthy();
  });

  it("sholud status is receive pending", () => {
    friend.status = RECEIVE_PENDING;

    const { getByText } = render(
      <FriendCard friend={friend} />
    );

    expect(getByText("수락")).toBeTruthy();
    expect(getByText("거절")).toBeTruthy();
  });

  it("sholud status is receive reject", () => {
    friend.status = RECEIVE_REJECT;

    const { getByText } = render(
      <FriendCard friend={friend} />
    );

    expect(getByText("삭제")).toBeTruthy();
  });
});
