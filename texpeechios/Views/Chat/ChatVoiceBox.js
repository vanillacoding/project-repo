import React from 'react';
import { Text, TextInput, ImageBackground, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import styles from './ChatStyles/ChatVoiceBoxStyles.js';

export default class ChatVoiceBox extends React.Component {

  render() {
    return (
      <TouchableOpacity
        onPress={() => { this.props.onSpeak() }}
        accessibilityLabel="voiceon"
      >
        <ImageBackground source={require('../../Sources/Images/voicemode-bg.png')} style={styles.chatVoiceBox}>
          <Image style={styles.voiceBoxIcon} source={require('../../Sources/Images/icon-mic-white-m.png')} />
          <Text style={styles.voiceBoxText}>음성모드 사용중</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}