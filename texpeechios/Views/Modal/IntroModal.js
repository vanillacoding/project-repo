import React from 'react';
import { Modal, TextInput, StatusBar, ToastAndroid, Platform, TouchableHighlight, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import Intro from '../Intro/Intro.js';
import Chat from '../Chat/Chat.js';
// import firebase from '../../Settings/Firebase.js';

export default class IntroModal extends React.Component {

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 24,
                color: '#5a5a5a',
                fontWeight: 'bold',
                marginBottom: 16,
                textAlign: 'center',
              }}>대화명을 입력하세요</Text>
              <TextInput
                style={{
                  width: 200,
                  height: 40,
                  padding: 0,
                  paddingLeft: 8,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#979797',
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                value={this.props.text}
                onChangeText={(text) => {
                  this.props.usernameInput(text)
                }}
                placeholder={'대화명을 입력하세요'}>
              </TextInput>
              {
                this.props.username &&
                <TouchableHighlight
                  underlayColor={'#7A47C2'}
                  style={{
                    marginTop: 16,
                    width: 200,
                    height: 40,
                    padding: 8,
                    backgroundColor: '#C86DD7',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.props.setModalVisible();
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>입력완료</Text>
                </TouchableHighlight>
              }
            </View>
          </View>
        </Modal >
      </View>
    );
  }
};

