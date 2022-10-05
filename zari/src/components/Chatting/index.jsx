import React, { useState, useEffect, useRef } from 'react';

import { Chatting as S } from './styles';
import { socket, socketApi } from '../../utils/socket';

export default function Chatting({ user }) {
  // TODO useChatting hook으로 분리하기
  const [showChatting, setShowChatting] = useState(false);
  const [chatText, setChatText] = useState('');
  const [chatTextList, setChatTextList] = useState([]);
  const chatScroll = useRef();

  function handleEnterPress(event) {
    event.preventDefault();

    if (chatText !== '') {
      socketApi.sendMessage({
        message: chatText,
        user: user.nickname ?? user.name,
      });

      setChatText('');
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }

  useEffect(() => {
    socket.on('receiveMessage', data => {
      setChatTextList(state => [...state, data]);
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    });

    return () => {
      socket.removeAllListeners('receiveMessage');
    }
  }, []);

  function handleChatButtonClick() {
    setShowChatting(state => !state);
  }

  function handleChatTextChange(e) {
    setChatText(e.target.value);
  }

  return (
    <>
      <S.ButtonContainer>
        <S.ChatButton
          size={48}
          onClick={handleChatButtonClick}
        />
      </S.ButtonContainer>
      <S.ChatContainer toggled={showChatting}>
        <S.ChatTextContainer ref={chatScroll}>
          <S.TextContainer>
            {chatTextList.map((data, index) => {
              return (
                <S.TextItem key={index}>
                  <S.UserNickname>{`${data.user}: `}</S.UserNickname>
                  <S.Text>{data.message}</S.Text>
                </S.TextItem>
              );
            })}
          </S.TextContainer>
        </S.ChatTextContainer>
        <S.ChatInputForm onSubmit={handleEnterPress}>
          <S.Input type="text" value={chatText} onChange={handleChatTextChange}/>
        </S.ChatInputForm>
      </S.ChatContainer>
    </>
  );
}
