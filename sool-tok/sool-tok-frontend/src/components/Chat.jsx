import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { chatSocket } from '../utils/socket';

import { BsFillChatDotsFill } from 'react-icons/bs';

import ChatRoom from './ChatRoom';
import Button from './Button';

function Chat({
  user,
  chatList,
  unreadCount,
  addChat,
  resetChat,
  increaseUnreadCount,
  resetUnreadCount,
}) {
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);

  useEffect(() => {
    chatSocket.listenMessage(({ chat }) => addChat(chat));

    return () => {
      chatSocket.cleanUpMessageListener();
      resetChat();
    };
  }, []);

  useEffect(() => {
    if (isChatRoomOpen) return;

    if (chatList.length) {
      increaseUnreadCount();
    }
  }, [chatList, isChatRoomOpen]);

  useEffect(() => {
    resetUnreadCount();
  }, [isChatRoomOpen]);

  return (
    <>
      <Button onClick={() => setIsChatRoomOpen(!isChatRoomOpen)}>
        <BsFillChatDotsFill size={28} />
        {!!unreadCount && <Badge>{unreadCount}</Badge>}
      </Button>
      {isChatRoomOpen &&
        <ChatRoom
          user={user}
          chatList={chatList}
          onSubmit={newChat => chatSocket.sendMessage({ newChat })}
        />
      }
    </>
  );
}

const Badge = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 12px;
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
`;

export default Chat;

Chat.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
  chatList: PropTypes.array.isRequired,
  unreadCount: PropTypes.number.isRequired,
  addChat: PropTypes.func.isRequired,
  resetChat: PropTypes.func.isRequired,
  increaseUnreadCount: PropTypes.func.isRequired,
  resetUnreadCount: PropTypes.func.isRequired,
};
