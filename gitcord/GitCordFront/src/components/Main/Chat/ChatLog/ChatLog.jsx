import React from "react";
import { RiRunLine } from "react-icons/ri";
import { v1 as uuidv1 } from "uuid";
import styled from "styled-components";
import PropTypes from "prop-types";

import MainIcon from "../../../publicComponents/MainIcon/MainIcon";

const ChatLogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 1em;
  font-size: 0.8rem;
  float: ${(props) =>
    props.user.email === props.chatEmail ? "right" : "left"
  };

  .chat-log-title {
    display: flex;
    width: 100%;
    flex-direction: ${(props) =>
      props.user.email === props.chatEmail ? "row-reverse" : "row"
    };
    align-items: center;
  }

  .chat-text {
    min-width: 10em;
    max-width: 20em;
    height: auto;
    min-height: 1.5em;
    margin-left: 1em;
    padding: 0.5em 0.8em;
    line-height: 20px;
    border-radius: 10px;
    background-color: ${(props) =>
      props.user.email === props.chatEmail ? "#BE79DF" : "#FBCFFC"
    };
    font-weight: bold;
    word-break: break-all;
    text-align: left;
    color: ${(props) =>
      props.user.email === props.chatEmail ? "#ffffff" : "#000000"
    };
  }
`;

const SystemLogContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.8rem;
`;

function ChatLog({ chatLog, user }) {
  const {
    chatTime,
    userName,
    userChat,
    userEmail
  } = chatLog;

  if (chatLog.systemLog) {
    return (
      <SystemLogContainer key={uuidv1()}>
        <span>
          <RiRunLine />{chatLog.systemLog}
        </span>
      </SystemLogContainer>
    );
  }

  return (
    <ChatLogContainer
      user={user}
      chatEmail={userEmail}
      key={uuidv1()}
    >
      <div className="chat-log-title">
        <MainIcon width="30px" height="30px" />
        <div>
          <span>{userName}</span>{" "}
          <span>{chatTime}</span>
        </div>
      </div>
      <div className="chat-text">
        {userChat}
      </div>
    </ChatLogContainer>
  );
}

ChatLog.propTypes = {
  chatLog: PropTypes.shape({
    chatTime: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userChat: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired
  }),
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default ChatLog;
