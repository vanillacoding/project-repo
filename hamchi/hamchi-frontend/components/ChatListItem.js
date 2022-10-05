import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

import { formatDate } from '../utils';
import colors from '../theme/color';

const ChatListItem = ({ date, user, lastMessage, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.user}>{user}</Text>
          <Text style={styles.message}>{lastMessage}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.time}>{formatDate(new Date(date))}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    height: 70,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.white,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 14,
  },
  leftContainer: {
    flex: 5,
    justifyContent: 'space-around'
  },
  rightContainer: {
    flex: 1,
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16
  },
  message: {
    fontSize: 14,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey'
  }
});

export default ChatListItem;
