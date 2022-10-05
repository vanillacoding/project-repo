import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class FriendListEntry extends React.Component {



  getAvatarText(nickname) {
    if (nickname) {
      return nickname.slice(0, 1).toUpperCase();
    } else {
      return 'Un';
    }
  }


  render() {
    // var dummyData = [{
    //   recordID: 'ewfjgoi2io!1nv2h3brj2',
    //   familyName: '김',
    //   givenName: '동준',
    //   phoneNumber: '010-5874-4778'
    // }
    // ];
    var userName = this.props.renderData.familyName + this.props.renderData.givenName;
    return (
      <View style={{ flex: 1, }}>
        <TouchableOpacity onPress={this.props.createRoom.bind(this, this.props.renderData.userName)} style={FriendListEntryStyles.container}>
          <View style={FriendListEntryStyles.avatar}>
            <Text style={FriendListEntryStyles.avatarText}>
              {this.getAvatarText(userName)}
            </Text>
          </View>
          <View style={FriendListEntryStyles.firstColumn}>
            <Text style={FriendListEntryStyles.userName}>{userName}</Text>
            <View style={FriendListEntryStyles.lastDateWrap}>
            </View>
          </View>
          <View style={FriendListEntryStyles.secondColumn}>
            <Text style={FriendListEntryStyles.lastDate}>{this.props.renderData.lastDate}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const FriendListEntryStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    marginBottom: 8,
    flexDirection: 'row',
  },
  firstColumn: {
    flex: 6,
    flexDirection: 'row',
  },
  secondColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  userName: {
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
    paddingLeft: 8,
    alignSelf: 'center',
    color: '#424242',
  },
  avatar: {
    backgroundColor: '#C86DD7',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: '#929292',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
  },


});

module.exports = FriendListEntry;

