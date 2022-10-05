import React from 'react';
import { Text, View } from 'react-native';
import styles from './ChatStyles/ChatNoticeStyles';

export default class ChatNotice extends React.Component {

  render() {
    return (
      <View style={styles.noticeWrap}>
        <Text style={styles.font}> {this.props.username} <Text style={{ fontWeight: 'normal', color: '#626262' }}>님이 들어오셨습니다.</Text></Text>
        <Text style={styles.noticeDateFont}> {this.props.date} </Text>
      </View>
    );
  }
}
