import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createError } from '../features/userSlice';
import { useFocusEffect } from '@react-navigation/native';

import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatListItem from '../components/ChatListItem';
import Empty from '../components/shared/Empty';
import chatAPI from '../api/chat';

const ChatList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [chats, setChats] = useState(null);
  const userId = useSelector(state => state.user.userId);
  const isEntered = useSelector(state => state.chat.isEntered);

  useFocusEffect(
    useCallback(() => {
      getMyChats();
    }, [isEntered])
  );

  function compareDate(chat1, chat2) {
    const time1 = new Date(chat1.lastMessage.time).getTime();
    const time2 = new Date(chat2.lastMessage.time).getTime();

    return time2 - time1;
  }

  function sortChats(chats) {
    return chats.sort(compareDate);
  }

  async function getMyChats() {
    try {
      const response = await chatAPI.requestGetChats(userId);

      if (response.code === 200) {
        setChats(sortChats(response.data.chats));
      } else {

      }
    } catch (err) {
      dispatch(createError(errorMessage.INTERNAL_ERROR));
    }
  }

  function handleChatListItemPress(chatId, messageId, partnerName) {
    navigation.navigate(
      'ChatRoom', {
      name: partnerName,
      chatId: chatId,
      messageId: messageId
    });
  }

  if (chats !== null && chats.length === 0) {
    return (
      <Empty
        title="채팅리스트가 존재하지 않습니다"
      />
    );
  }

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          const owner = item.owner;
          const guest = item.guest;
          const partnerName = owner.id === userId ? guest.name : owner.name;

          const date = item.lastMessage.time;
          const messageId = item.messages;
          const lastMessage = item.lastMessage.message;

          return (
            <ChatListItem
              key={item._id}
              date={date}
              user={partnerName}
              lastMessage={lastMessage}
              onPress={() => handleChatListItemPress(item._id, messageId, partnerName)}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatList;
