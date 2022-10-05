import React from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, Button, Text, View } from 'react-native';
import styles from './ListStyles/ListStyles.js';
import ListHeaderBar from './ListHeaderBar.js';
import ChatListEntry from './ChatListEntry.js';

export default class ChatList extends React.Component {

  scrollToEnd() {
    // setTimeout(this.refs.scrollView.scrollToEnd, 50);
  }

  componentDidUpdate() {
    // this.scrollToEnd();
  }

  render() {
    var dummyData = [{
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    {
      roomTitle: ['대화에 참여한 사람'],
      lastMessage: '마지막 메시지 입니다.',
      lastDate: '마지막 메시지의 날짜'
    },
    ];

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ListHeaderBar selectedTab={this.props.selectedTab} />
        <ScrollView
          style={styles.scrollContainer}
          ref="scrollView"
        // onLayout={() => this.scrollToEnd()}
        >
          <ChatListEntry
            renderData={{
              roomTitle: '관리자방',
              lastMessage: '테스트방!',
              lastDate: '2222년 1월 1일 1시 1분'
            }}
            joinRoom={(roomName) => {
              this.props.joinRoom(roomName);
            }}
          />
          {
            dummyData.map((data, idx) => {
              return <ChatListEntry
                key={idx}
                renderData={data}
                joinRoom={() => {
                  this.props.joinRoom();
                }}
              />
            })
          }
        </ScrollView >
      </View>
    );
  }
}

module.exports = ChatList;

