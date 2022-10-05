import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity, Button, Text, View } from 'react-native';
import styles from './ChatStyles/ChatStyles.js';
import ChatNotice from './ChatNotice.js';
import ChatLeftMsgs from './ChatLeftMsgs.js';
import ChatRightMsgs from './ChatRightMsgs.js';
import ChatVoiceToggleBox from './ChatVoiceToggleBox.js';
import ChatInputBox from './ChatInputBox.js';
import ChatVoiceBox from './ChatVoiceBox.js';
import ChatHeaderBar from './ChatHeaderBar.js';

export default class Chat extends React.Component {

  scrollToEnd() {
    setTimeout(this.refs.scrollView.scrollToEnd, 50);
  }

  componentDidUpdate() {
    this.scrollToEnd();
  }



  render() {
    let renderData = null;
    if (this.props.MyMsgs) {
      renderData = <ChatRightMsgs msgDatas={this.props.MyMsgs} />
    } else if (this.props.username) {
      renderData = <ChatNotice username={this.props.username} />
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ChatHeaderBar
          backAction={() => { this.props.backAction() }}
        />
        <ScrollView
          style={styles.scrollContainer}
          ref="scrollView"
          onLayout={() => this.scrollToEnd()}
        >
          {
            this.props.currentDatas &&
            this.props.currentDatas.map((currentData, idx) => {
              if (currentData.type === 'join') {
                return <ChatNotice key={idx} username={currentData.nickname} date={currentData.created_at} />
              } else if (currentData.type === 'Msg' && this.props.username === currentData.nickname) {
                return <ChatRightMsgs key={idx} msgDatas={currentData} />
              } else {
                return <ChatLeftMsgs key={idx} msgDatas={currentData} />
              }
            })
          }
        </ScrollView >
        <ChatVoiceToggleBox
          toggleValue={this.props.toggleValue}
          toggleValueChange={(val) => {
            this.props.toggleValueChange(val);
          }}
        />
        {
          !this.props.toggleValue ?
            <ChatInputBox
              sendMyMsg={(text) => {
                this.scrollToEnd();
                this.props.sendMyMsg(text);
              }}
            /> : <ChatVoiceBox
              onSpeak={() => {
                this.props.onSpeak();
              }}
            />
        }
      </View>
    );
  }
}

