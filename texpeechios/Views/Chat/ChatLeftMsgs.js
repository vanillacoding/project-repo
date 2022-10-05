import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './ChatStyles/ChatLeftMsgsStyles.js';

export default class ChatLeftMsgs extends React.Component {

  getAvatarText(nickname) {
    if (nickname) {
      return nickname.slice(0, 1).toUpperCase();
    } else {
      return 'Un';
    }
  }

  render() {
    return (
      <View style={styles.yourMsgsWrap}>
        <View style={styles.yourMsg}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {this.getAvatarText(this.props.msgDatas.nickname)}
            </Text>
          </View>
          <View style={styles.leftMsgContainerMsgs}>
            <Text style={styles.nicknameText}>{this.props.msgDatas.nickname}</Text>
            <View style={styles.leftMsgBoxNewWrap}>
              <View style={styles.msgBox}>
                <Text selectable={true} style={styles.msgFont}>{this.props.msgDatas.message.text}
                </Text>
              </View>
              <View style={styles.leftMsgContainerModeDates}>
                {
                  this.props.msgDatas.message.on_voice_mode &&
                  <View style={styles.yourMsgMicIconWrap}>
                    <Image style={styles.micIcon} source={require('../../Sources/Images/icon-mic-g.png')} />
                  </View>
                }
                <View style={styles.msgDateWrap}>
                  <Text style={styles.yourMsgDate}>{this.props.msgDatas.created_at}</Text>
                </View>
              </View>
            </View>
          </View>

        </View>

      </View>
    );
  }
}
