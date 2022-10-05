import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import ChatListItem from '../../components/ChatListItem';

describe('chat list item test', () => {
  it('renders correctly', () => {
    const mockDate = '2021.5.26';
    const mockUser = 'test user';
    const mockLastMessage = 'test last message';

    const tree = renderer.create(
      <ChatListItem
        date={mockDate}
        user={mockUser}
        lastMessage={mockLastMessage}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('show date, user, last message prop', () => {
    const mockEnterChat = jest.fn();
    const mockUser = 'test user';

    const { getByText } = render(
      <ChatListItem
        user={mockUser}
        onPress={mockEnterChat}
      />
    );

    const chatListItem = getByText(mockUser);
    fireEvent.press(chatListItem);
    expect(mockEnterChat).toHaveBeenCalledTimes(1);
  });
});
