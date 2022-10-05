import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import empty from '../../assets/png/empty.png';

const Empty = ({ title }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={empty}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  }
});

export default Empty;
