import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Message from '../components/Message';
import { socket } from '../socket';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ErrorMessage from '../components/ErrorMessage';

let scrollView;

export default function ChatScreen({
  chatId,
  nickname,
  chatList,
  users,
  deviceAddress,
  typingMessage,
  errorMessage
}) {
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleSendButtonClick = async () => {
    if (!message) return;

    const messageData = { nickname, message };
    const {
      data: { data }
    } = await axios.post(
      `http://loca-chat.ap-northeast-2.elasticbeanstalk.com/api/chats/${chatId}/message/text`,
      messageData
    );

    socket.emit(
      'message',
      { nickname: data.nickname, message: data.message, image: null, date: data.date },
      chatId
    );

    setMessage('');
  };

  const handleBlur = () => {
    setIsFocus(false);
    socket.emit('stopTyping', nickname, chatId);
  };

  const handleFocus = () => {
    setIsFocus(true);
    socket.emit('typing', nickname, chatId);
  };

  const handelImgIconClick = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      const photo = {
        uri: pickerResult.uri,
        name: 'new-photo.jpg',
        type: 'multipart/form-data'
      };

      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('nickname', nickname);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const {
        data: { data }
      } = await axios.post(
        `http://loca-chat.ap-northeast-2.elasticbeanstalk.com/api/chats/${chatId}/message/image`,
        formData,
        config
      );

      socket.emit(
        'message',
        {
          nickname: data.nickname,
          message: null,
          imageUrl: data.imageUrl,
          date: data.date
        },
        chatId
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.people}>
        <Ionicons name="md-person" size={28} color="black" />
        <Text style={styles.peopleCount}>{users.length}</Text>
      </View>
      <ScrollView
        style={styles.chatContainer}
        ref={(ref) => (scrollView = ref)}
        onContentSizeChange={() => {
          scrollView.scrollToEnd({ animated: true });
        }}>
        {chatList.map((chat, index) => (
          <Message
            key={index}
            nickname={chat.nickname}
            message={chat.message}
            imageUrl={chat.imageUrl}
            date={chat.create_at}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(message) => setMessage(message)}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {!isFocus && (
          <View style={styles.imgButton}>
            <Ionicons
              name="md-image"
              size={32}
              color="#323232"
              onPress={handelImgIconClick}
            />
          </View>
        )}
        <TouchableOpacity style={styles.sendButton} onPress={handleSendButtonClick}>
          <Ionicons name="md-send" size={32} color="#0779e4" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{typingMessage}</Text>
      </View>
      {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  chatContainer: {
    marginBottom: 10
  },
  input: {
    width: '89%',
    borderWidth: 1,
    borderColor: 'rgba(140, 140, 140, 1)',
    padding: 5,
    borderRadius: 5,
    marginBottom: 1
  },
  sendButton: {
    width: '20%',
    color: 'red',
    borderWidth: 1,
    borderRadius: 20,
    padding: 9
  },
  chat: {
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    padding: 3,
    paddingBottom: 8,
    paddingTop: 8,
    marginLeft: 3,
    marginBottom: 2
  },
  people: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  peopleCount: {
    fontSize: 20,
    marginLeft: 5
  },
  imgButton: {
    position: 'absolute',
    top: 7,
    left: '80%'
  }
});
