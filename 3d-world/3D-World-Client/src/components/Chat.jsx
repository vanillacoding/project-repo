import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledInput from "./shared/StyledInput";
import { roomSocket } from "../utils/socket";

const ChatHeader = styled.header`
  padding: 0.5rem;
  font-weight: bolder;
  border-bottom: 1.5px dashed ${(props) => props.theme.titleColor.color};
  margin-bottom: 1rem;
  color: ${(props) => props.theme.titleColor.color};
  height: 10%;
`;

const ChatButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 3px;
`;

const ChatContainer = styled.div`
  height: 50%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const ChatMessage = styled.li`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  color: #313131;
`;

// TODO: 채팅 입력하면 맨 밑이 보이도록
const ChatList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  height: 80%;
  border-radius: 2px;
  background-color: #f0eeee;
  margin-bottom: 1rem;
  overflow-y: scroll;
`;

const FormContainer = styled.form`
  position: relative;
  height: 10%;
`;

function Chat({ isSocketReady }) {
  const [chatList, setChatList] = useState([]);
  const inputRef = useRef();
  const chatListRef = useRef();

  useEffect(() => {
    if (!isSocketReady) return;

    function handleChat(data) {
      setChatList((prev) => prev.concat(data));
    }

    roomSocket.listenChatMessage(handleChat);
    return () => setChatList([]);
  }, [isSocketReady]);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [chatList]);

  function handleSubmit(e) {
    e.preventDefault();
    const message = inputRef.current.value;

    if (!message) return;

    setChatList((prev) => prev.concat({ user: "나", message }));
    roomSocket.sendChatMessage({ message });
    inputRef.current.value = "";
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <span>채팅하기</span>
      </ChatHeader>
      <ChatList ref={chatListRef}>
        {chatList.map((chat, index) => (
          <ChatMessage key={`${chat.user + index}`}>
            {`${chat.user}: ${chat.message}`}
          </ChatMessage>
        ))}
      </ChatList>
      <FormContainer
        onSubmit={handleSubmit}
      >
        <StyledInput
          ref={inputRef}
        />
        <ChatButton type="submit">🚀</ChatButton>
      </FormContainer>
    </ChatContainer>
  );
}

Chat.propTypes = {
  isSocketReady: PropTypes.bool,
};

export default Chat;
