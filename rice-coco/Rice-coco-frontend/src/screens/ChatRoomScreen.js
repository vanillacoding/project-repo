import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import configuredAxios from '../config/axiosConfig';
import MESSAGE from '../constants/message';
import { socket, socketApi } from '../socket';
import MessageBox from '../components/MessageBox';
import SOCKET_EVENT from '../constants/socket';
import ROUTE from '../constants/route';
import ICON_NAME from '../constants/icon';
import { Wrapper, ListContainer, StyledFlatList } from '../shared/index';

const ChatRoom = ({ userId, nickname, meetingId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [partnerNickname, setPartnerNickname] = useState('');
  const messageList = useRef(null);

  useEffect(() => {
    if (!messages) return;

    (async () => {
      try {
        const {
          data: { filteredMessages },
        } = await configuredAxios.get(
          `${ROUTE.MEETINGS}/${meetingId}${ROUTE.CHAT}`
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.warn(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    socket.on(SOCKET_EVENT.MESSAGE, ({ userId, nickname, message }) => {
      setPartnerNickname(nickname);
      setMessages(pre => [...pre, { userId, nickname, message }]);
    });

    return () => socket.off(SOCKET_EVENT.MESSAGE);
  }, []);

  const handleMessageSubmit = async () => {
    if (!message) return;

    socketApi.sendMessage(userId, nickname, message, () => setMessage(''));
  };

  return (
    <Wrapper>
      <ListContainer>
        <StyledFlatList
          ref={messageList}
          onContentSizeChange={() => messageList.current.scrollToEnd()}
          data={messages}
          renderItem={({ item }) => (
            <MessageBox
              user={item.userId === userId}
              message={item.message}
              nickname={item.nickname}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </ListContainer>
      <Input
        onChangeText={setMessage}
        value={message}
        errorMessage={
          message
            ? `${partnerNickname}님에게 메세지를 전달하세요`
            : MESSAGE.SHOULD_ENTER
        }
        rightIcon={
          <Icon
            name={ICON_NAME.ARROW}
            size={24}
            onPress={handleMessageSubmit}
          />
        }
      />
    </Wrapper>
  );
};

export default connect(state => ({
  userId: state.user._id,
  nickname: state.user.nickname,
  meetingId: state.meetings.selectedMeeting.meetingId,
}))(ChatRoom);
