import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ChatRoom.module.css";

const ChatRoom = ({ socket }) => {
  const [text, setText] = useState("");

  const userSocketId = useSelector(state => state.user.socketId);
  const roomMatch = useSelector(state => state.roomMatch);
  const partnerSocketId = roomMatch.partner.socketId;
  const chats = roomMatch.chats;

  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;

    socket.emit("sendTextMessage", { text, userSocketId, partnerSocketId });

    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.wrapper} >
      <ul className={styles.textList} >
        {chats.length > 0 && (
          chats.map((chat, index) => {
            const isMyText = chat.userSocketId === userSocketId;

            return (
              <div
                className={isMyText ? styles.userBubble : styles.partnerBubble}
                key={index}
              >
                <div className={styles.bubbleA} ></div>
                <div className={styles.bubbleB} ></div>
                <div className={styles.bubbleC} ></div>
                <li
                  key={index}
                  className={isMyText ? styles.userText : styles.partnerText}
                >
                  {chat.text}
                </li>
                <div className={styles.bubbleC} ></div>
                <div className={styles.bubbleB} ></div>
                <div className={styles.bubbleA} ></div>
                <div className={isMyText ? styles.userArrow : styles.partnerArrow} >
                  <div className={styles.arrowA} ></div>
                  <div className={styles.arrowB} ></div>
                  <div className={isMyText ? styles.userArrowC : styles.partnerArrowC} ></div>
                  <div className={isMyText ? styles.userArrowD : styles.partnerArrowD} ></div>
                </div>
              </div>
            );
          })
        )}
        <div ref={chatRef} ></div>
      </ul>
      <div className={styles.messageInput} >
        <form onSubmit={(e) => handleSubmit(e)} >
          <div>
            <input type="text" onChange={handleTextChange} value={text} />
          </div>
          <div className={styles.messageBtn}>
            <button type="submit">
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  socket: PropTypes.object.isRequired,
};
