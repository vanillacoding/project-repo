import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./Chat.css";
import { CHAT } from "../../constants/socketEvents";

function Chat({ roomName, socket }) {
  const [messages, setMessages] = useState([]);
  const windowRef = useRef();

  useEffect(() => {
    socket.on(CHAT, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.removeAllListeners(CHAT);
    };
  }, []);

  useEffect(() => {
    if (!messages.length) {
      return;
    }

    const lastMessageElement = windowRef.current.children[messages.length - 1];
    lastMessageElement.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    const message = ev.target.message.value;

    setMessages((prev) => [...prev, `YOU: ${message}`]);
    socket.emit(CHAT, roomName, message);

    ev.target.message.value = "";
  };

  const messageElements = messages.map((message, i) => {
    return <p key={`message${i}`}>{message}</p>;
  });

  return (
    <div className="chat">
      <h2>CHAT</h2>
      <div className="chatting-window" ref={windowRef}>
        {messageElements}
      </div>
      <form className="chatting-form" onSubmit={handleFormSubmit}>
        <input type="text" name="message" required />
        <button>chat</button>
      </form>
    </div>
  );
}

Chat.propTypes ={
  roomName: PropTypes.string,
  socket: PropTypes.object,
};

export default Chat;
