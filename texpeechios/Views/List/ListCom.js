// 'use strict';

import React from 'react';
import { AppRegistry, StyleSheet, Image, Text, View, TabBarIOS } from 'react-native';
import styles from './ListStyles/ListStyles.js';
import ChatList from './ChatList.js';
import FriendList from './FriendList.js';
import Settings from './Settings.js';
import PropTypes from 'prop-types';

export default class ListCom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Friends'
    }
  }

  render() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#C86DD7'}
      >
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Friends'}
          icon={{ uri: 'TabBarIcon-friends.png', scale: 2 }}
          selectedIcon={{ uri: 'TabBarIcon-friends-selected.png', scale: 2 }}
          title={'Friends'}
          onPress={() => {
            this.setState({
              selectedTab: 'Friends'
            })
          }}
        >
          <FriendList
            selectedTab={this.state.selectedTab}
            createRoom={() => {
              this.props.createRoom();
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Chats'}
          icon={{ uri: 'TabBarIcon-chats.png', scale: 2 }}
          selectedIcon={{ uri: 'TabBarIcon-chats-selected.png', scale: 2 }}
          title={'Chats'}
          onPress={() => {
            this.setState({
              selectedTab: 'Chats'
            })
          }}
        >
          <ChatList
            selectedTab={this.state.selectedTab}
            joinRoom={(roomName) => {
              this.props.joinRoom(roomName);
            }}
            currentUserName={this.props.currentUserName}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'Settings'}
          icon={{ uri: 'TabBarIcon-settings.png', scale: 2 }}
          selectedIcon={{ uri: 'TabBarIcon-settings-selected.png', scale: 2 }}
          title={'Settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'Settings'
            })
          }}
        >
          <Settings selectedTab={this.state.selectedTab} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

// AppRegistry.registerComponent('ListCom', () => ListCom);

ListCom.propTypes = {
  // selectedTab: PropTypes.String
};

const ListComStyles = StyleSheet.create({
  temp: {

  },
});


