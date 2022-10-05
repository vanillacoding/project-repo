import React from "react";
import useChatting from "../../hooks/useChatting";

function ChatBox() {
  const {
    inputValue,
    updateInputValue,
    handleSubmit,
    chatList,
    chatBoxRef,
  } = useChatting();

  return (
    <div className="chat-container">
      <div ref={chatBoxRef} className="chat-list">
        {chatList.map((chat, index) => (
          <div key={index} className="chat-list__item">
            <span className="chat-userName">{chat.userName}</span>
            <span>: {chat.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-form">
        <form className="chat-form__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-form__input input-text"
            value={inputValue}
            onChange={(e) => {
              updateInputValue(e.target.value);
            }}
          />
          <button>Chat</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
