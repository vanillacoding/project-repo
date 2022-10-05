import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SET_CHAT_LIST,
  UPDATE_CHAT_LIST,
  GET_CURRENT_USERS,
  SET_TYPING_USERS,
  SET_STOP_TYPING_USERS,
  SET_TYPING_MESSAGE,
  SET_ERROR_MESSAGE
} from '../constants/actionTypes';
import ChatScreen from '../screens/ChatScreen';
import { socket } from '../socket';
import axios from 'axios';

export default function ChatContainer({ route }) {
  const { chatList, users, typingMessage, errorMessage } = useSelector(
    (state) => state.chatReducer
  );
  const { deviceAddress, nickname } = useSelector((state) => state.userReducer);
  const { chatId } = route.params;
  const dispatch = useDispatch();

  const setChatList = (chatList) => {
    dispatch({ type: SET_CHAT_LIST, data: chatList });
  };

  const updateChatList = (message) => {
    dispatch({ type: UPDATE_CHAT_LIST, data: message });
  };

  const getCurrentUsers = (users) => {
    dispatch({ type: GET_CURRENT_USERS, data: users });
  };

  const setTypingUsers = (user) => {
    dispatch({ type: SET_TYPING_USERS, data: user });
  };

  const setStopTypingUsers = (user) => {
    dispatch({ type: SET_STOP_TYPING_USERS, data: user });
  };

  const setTypingMessage = () => {
    dispatch({ type: SET_TYPING_MESSAGE });
  };

  const setErrorMessage = (message) => {
    dispatch({ type: SET_ERROR_MESSAGE, data: message });
  };

  const getChatList = async () => {
    const { data } = await axios.get(
      `http://loca-chat.ap-northeast-2.elasticbeanstalk.com/api/chats/${chatId}`
    );

    if (data.result === 'ok') {
      setErrorMessage('');
      setChatList(data.data);
    }

    setErrorMessage(data.errorMessage);
  };

  useEffect(() => {
    getChatList();

    socket.emit('join', chatId, nickname);
    socket.on('message', (data) => updateChatList(data));
    socket.on('updateUsers', (users) => getCurrentUsers(users));
    socket.on('typing', (user) => {
      setTypingUsers(user);
      setTypingMessage();
    });
    socket.on('stopTyping', (user) => {
      setStopTypingUsers(user);
      setTypingMessage();
    });

    return () => {
      socket.emit('leave');
      socket.off('message');
      socket.off('updateUsers');
      socket.off('typing');
      socket.off('stopTyping');
    };
  }, []);

  return (
    <ChatScreen
      chatId={chatId}
      chatList={chatList}
      nickname={nickname}
      users={users}
      typingMessage={typingMessage}
      deviceAddress={deviceAddress}
      errorMessage={errorMessage}
    />
  );
}
