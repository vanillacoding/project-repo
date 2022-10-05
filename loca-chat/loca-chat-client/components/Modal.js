import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ReactModal from 'react-native-modal';
import axios from 'axios';
import { socket } from '../socket';
import ErrorMessage from './ErrorMessage';

export default function Modal({
  isVisible,
  setErrorMessage,
  errorMessage,
  myLatitude,
  myLongitude,
  deviceAddress,
  addChat,
  hideModal
}) {
  const location = { latitude: myLatitude, longitude: myLongitude };
  const [title, setTitle] = useState('');

  const handleCreateButtonClick = async () => {
    if (!title.trim()) return setErrorMessage('방이름을 입력해주세요');

    const {
      data: { data }
    } = await axios.post(
      `http://loca-chat.ap-northeast-2.elasticbeanstalk.com/api/chats/add`,
      {
        title,
        location
      }
    );

    if (data.result === 'ng') return setErrorMessage(data.errorMessage);

    socket.emit('createChat');
    // addChat(data);
    setErrorMessage('');
    hideModal();
  };

  const handleCancelButtonClick = () => {
    setTitle('');
    setErrorMessage('');
    hideModal();
  };

  return (
    <ReactModal isVisible={isVisible} style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.title}>채팅방 이름을 입력해주세요</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateButtonClick}>
            <Text style={styles.createButtonText}>만들기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelButtonClick}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
        <ErrorMessage errorMessage={errorMessage} />
      </View>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 220,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    marginTop: 20
  },
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(229,229,229)',
    padding: 10,
    width: 200,
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  createButton: {
    width: 55,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#1fcd97',
    padding: 6,
    alignItems: 'center',
    borderRadius: 5
  },
  cancelButton: {
    width: 55,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#1fcd97',
    padding: 6,
    alignItems: 'center',
    borderRadius: 5
  },
  createButtonText: {
    color: 'white'
  },
  cancelButtonText: {
    color: 'white'
  }
});
