import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

export default function Message({ nickname, imageUrl, message, date }) {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.nameDataContainer}>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text style={styles.date}>{moment(date).format('YYYY.MM.DD h:mm a')}</Text>
      </View>
      <View>
        {imageUrl && (
          <Image
            style={styles.image}
            source={{
              uri: imageUrl
            }}
          />
        )}
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    marginBottom: 15
  },
  nickname: {
    width: 100,
    fontSize: 20,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 12,
    marginLeft: 30,
    marginTop: 3
  },
  message: {
    fontSize: 17,
    marginTop: 5
  },
  nameDataContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 230,
    borderRadius: 5,
    marginTop: 20,
    resizeMode: 'contain'
  }
});
