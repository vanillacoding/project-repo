import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './ChatStyles/ChatRightMsgsStyles';

export default class ChatRightMsgs extends React.Component {

  render() {
    return (
      <View style={styles.myMsgsWrap}>
        <View style={styles.myMsg}>
          <View style={styles.msgDateWrap}>
            <Text style={styles.msgDate}>{this.props.msgDatas.created_at}</Text>
          </View>
          {
            this.props.msgDatas.message.on_voice_mode &&
            <View style={styles.msgMicIconWrap}>
              <Image style={styles.micIcon} source={require('../../Sources/Images/icon-mic-p.png')} />
            </View>
          }
          <View style={styles.myMsgContainer}>

            <View style={styles.myMsgBox}>
              <Text selectable={true} style={styles.myMsgFont}>{this.props.msgDatas.message.text}

              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
