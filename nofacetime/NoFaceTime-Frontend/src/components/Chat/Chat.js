import React from 'react';
import styles from './Chat.module.css';
// import { socket } from '../../utils/socket';
//import ScrollToBottom from 'react-scroll-to-bottom';
import { MENU_MODE } from '../../constants/index';

const Chat = ({
  mode,
  message,
  setMessage,
  sendMessage,
  targetMessage,
  nickname,
  setSendTo
}) => {
  const { PUBLIC_CHAT } = MENU_MODE;

  const messageList = targetMessage.map((message, index) => {
    const { from, text, to } = message;
    const isSentByUser = nickname === from;

    return (
      isSentByUser
        ? (
          <div key={index} className={styles.MyMessage}>
            <p className={styles.text}>{text}</p>
            {to && <p className={styles.Nickname}>{from}가 {to}에게..</p>}
          </div>
        )
        : (
          <div>
            <div key={index} className={styles.Message} onClick={() => setSendTo(from)}>
              <p className={styles.text}>{text}</p>
            </div>
            <p className={styles.Nickname}>{from}</p>
          </div>
        )
    );
  });

  return (
    <div className={styles.Chat}>
      {mode === PUBLIC_CHAT
        ? <div className={styles.Mode}>PUBLIC CHAT</div>
        : <div className={styles.Mode}>QUESTION CHAT </div>
      }
      <div className={styles.ChatBox}>
        <div className={styles.MessageList}>
          {console.log("MESSAGELIST", messageList)}
          {messageList}
        </div>
        <div className={styles.ChatInputBox}>
          <input
            className={styles.MessageBox}
            type='text'
            value={message}
            placeholder='Type a message...'
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
          <button
            className={styles.SendButton}
            onClick={(event) => {
              sendMessage(event);
              setMessage('');
            }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
