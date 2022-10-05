import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class ChatListEntry extends React.Component {

  render() {
    // var dummyData = [{
    //   roomTitle: ['대화에 참여한 사람'],
    //   lastMessage: '마지막 메시지 입니다.',
    //   lastDate: '마지막 메시지의 날짜'
    // }];

    return (
      <View style={{ flex: 1, }}>
        <TouchableOpacity onPress={() => { this.props.joinRoom(this.props.renderData.roomTitle) }} style={ChatListEntryStyles.container}>
          <View style={ChatListEntryStyles.firstColumn}>
            <Text style={ChatListEntryStyles.roomTitle}>{this.props.renderData.roomTitle}</Text>
            <View style={ChatListEntryStyles.lastDateWrap}>
              <Text style={ChatListEntryStyles.lastDate}>{this.props.renderData.lastDate}</Text>
            </View>
          </View>
          <View style={ChatListEntryStyles.secondColumn}>
            <Text style={ChatListEntryStyles.lastMessage}>{this.props.renderData.lastMessage}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const ChatListEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  firstColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  secondColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  roomTitle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    color: '#424242',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastDateWrap: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lastDate: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#626262',
    paddingRight: 8,
    fontSize: 12,
  },
  lastMessage: {
    paddingLeft: 8,
    alignSelf: 'center',
    color: '#424242',
  }

});

module.exports = ChatListEntry;

