import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity, Button, Text, View } from 'react-native';
import styles from './ListStyles/ListStyles.js';
import ListHeaderBar from './ListHeaderBar.js';
import FriendListEntry from './FriendListEntry.js';
var Contacts = require('react-native-contacts');

export default class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileContacts: null,
    }
  }
  scrollToEnd() {

  }

  componentDidUpdate() {
    Contacts.getAll((err, contacts) => {
      if (err) throw err;

      // contacts returned
      this.setState({
        mobileContacts: contacts
      })
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ListHeaderBar selectedTab={this.props.selectedTab} />
        <ScrollView
          style={styles.scrollContainer}
          ref="scrollView"
        >
          {
            this.state.mobileContacts &&
            this.state.mobileContacts.map((data) => {
              return <FriendListEntry
                key={data.recordID}
                renderData={data}
                createRoom={(value) => {
                  console.warn(value);
                  this.props.createRoom();
                }}
              />
            })
          }
        </ScrollView >
      </View>
    );
  }
}

module.exports = FriendList;
