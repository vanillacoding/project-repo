import React, { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";

import { CHATS } from "../constants/constants";
import getTimeString from "../utils/getTimeString";

import styles from "./styles/Chat.module.css";
import Input from "./shared/Input";
import InputButton from "./shared/InputButton";

const Chat = () => {
  const [chatDatum, setChatDatum] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const chatContainerRef = useRef();

  useEffect(() => {
    if (!shouldSendMessage) {
      return;
    }

    socket.emit("chat", chatMessage);
    setShouldSendMessage(false);
    setChatMessage("");
  }, [chatMessage, shouldSendMessage, setShouldSendMessage]);

  useEffect(() => {
    socket.on(
      "connected user",
      ({ name: userName, createdAt }) => {
        const chatData = {
          type: CHATS.CONNECTED_USER,
          userName,
          createdAt,
        };
        setChatDatum(
          (lastChatContents) => [...lastChatContents, chatData],
        );
      },
    );
    socket.on(
      "disconnected user",
      ({ name: userName, disconnectedAt }) => {
        const chatData = {
          type: CHATS.DISCONNECTED_USER,
          userName,
          createdAt: disconnectedAt,
        };
        setChatDatum((lastChatContents) => [...lastChatContents, chatData]);
      },
    );
    socket.on(
      "chat",
      ({ user, message, createdAt }) => {
        let isSelf = false;

        if (socket.id === user.id) {
          isSelf = true;
        }

        const chatData = {
          type: CHATS.MESSAGE,
          isSelf,
          userName: user.name,
          message,
          createdAt,
        };
        setChatDatum((lastChatContents) => [...lastChatContents, chatData]);
      }
    );

    return () => {
      ["connected user", "disconnected user", "chat"]
        .forEach((eventName) => socket.removeAllListeners(eventName));
    };
  }, [setChatDatum]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatDatum]);

  const chats = chatDatum.map(({
    type,
    userName,
    isSelf,
    message,
    createdAt,
  }) => {
    if (type === CHATS.CONNECTED_USER) {
      return (
        <li className={styles.connection} key={createdAt}>
          <span>{userName}님이 입장하셨습니다.</span>
        </li>
      );
    } else if (type === CHATS.MESSAGE) {
      return (
        <li
          className={isSelf
            ? styles.myMessageContainer
            : styles.otherMessageContainer
          }
          key={createdAt}
        >
          {isSelf ? null : <span className={styles.userName}>{userName}</span>}
          <p
            className={isSelf ? styles.myMessage : styles.otherMessage}
          >
            {message}
          </p>
          <span className={styles.messageDate}>{getTimeString(createdAt)}</span>
        </li>
      );
    } else if (type === CHATS.DISCONNECTED_USER) {
      return (
        <li className={styles.connection} key={createdAt}>
          <span>{userName}님이 퇴장하셨습니다.</span>
        </li>
      );
    }

    return null;
  });

  const handleInput = (event) => {
    setChatMessage(event.target.value);
  };
  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (!chatMessage) {
      return;
    }

    setShouldSendMessage(true);
  };

  return (
    <div className={styles.chatContainer}>
      <ol
        className={styles.chatBorder}
        ref={chatContainerRef}
      >
        {chats}
      </ol>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmitMessage}
      >
        <Input
          inputClassName={styles.chatInput}
          inputAttr={{
            onInput: handleInput,
            value: chatMessage,
          }}
        />
        <InputButton
          className={styles.submitButton}
          text={"전송"}
        />
      </form>
    </div>
  );
};

export default Chat;
