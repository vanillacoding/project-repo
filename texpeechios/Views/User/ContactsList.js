import React from 'react';
import { ScrollView, StatusBar, TouchableOpacity, Button, Text, View } from 'react-native';
import styles from '../List/ListStyles/ListStyles.js';
import ListHeaderBar from '../List/ListHeaderBar.js';
import FriendListEntry from '../List/FriendListEntry.js';
var Contacts = require('react-native-contacts')



export default class ContactsList extends React.Component {
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
    let renderData = null;

    var dummyData = [{
      recordID: 'ewfjgoi2io!1nv2h3brj2',
      familyName: '김',
      givenName: '동준',
      phoneNumber: '010-5874-4778'
    }
    ];
    if (this.state.mobileContacts) {
      var filterList = this.state.mobileContacts.filter((data) => {
        data.familyName.indexOf('피치트리') || data.givenName.indexOf('피치트리')
      });
    }

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
            filterList.map((data) => {
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

module.exports = ContactsList;
