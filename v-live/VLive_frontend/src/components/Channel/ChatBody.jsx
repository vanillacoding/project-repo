import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import useChat from '../../hooks/channel/useChat';
import { useSocket } from '../../hooks/socket/useSocket';

import { EVENTS } from '../../constants/socketEvent';
import ErrorBox from '../ErrorBox';

export default function ChatBody() {
  const {
    query: { channelId },
  } = useRouter();
  const { chatList, error, mutate } = useChat(channelId);
  const chatRef = useRef();

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  useEffect(() => {
    if (chatList == null) return;

    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatList]);

  useSocket(EVENTS.LISTEN_NEW_CHAT, (newChat) => {
    mutate([...chatList, newChat]);
  });

  if (channelId == null || chatList == null) {
    return null;
  }

  return (
    <Contents ref={chatRef}>
      <ul className="chat-list">
        {chatList.map((chat) => (
          <Content key={chat._id}>
            <span className="author">{chat.author}</span>
            <span>{chat.chat}</span>
          </Content>
        ))}
      </ul>
    </Contents>
  );
}

const Contents = styled.div`
  height: 85%;
  padding: 10px 30px 0 30px;
  box-sizing: border-box;
  border-inline: 2px solid ${({ theme }) => theme.darkNavy};
  background-color: ${({ theme }) => theme.darkNavy}80;
  overflow-y: auto;
  color: white;

  .chat-list {
    padding: 10px 0 0 10px;
    list-style: none;
    text-align: left;
  }

  &::-webkit-scrollbar {
    width: 13px;
    background-color: ${({ theme }) => theme.darkNavy};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.blue};

    &:hover {
      background-color: ${({ theme }) => theme.white};
      border: none;
    }
  }
`;

const Content = styled.li`
  margin-top: 5px;

  .author {
    margin-right: 10px;
    padding: 0 5px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 14px;
    background-color: #d6d6d6;
    color: ${({ theme }) => theme.darkNavy};
  }
`;
