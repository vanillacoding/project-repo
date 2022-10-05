import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PhotoCard from './PhotoCard';
import colors from '../theme/color';

const AdoptCard = ({ data, onPress }) => {
  return (
    <View
      style={styles.cardContainer}>
      <PhotoCard
        uri={data.image}
        type={data.type}
      />
      <Text style={styles.text}>{data.name}</Text>
      <Text style={styles.username}>{data.ownerName}님</Text>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    alignSelf: 'flex-start',
    marginTop: 10,
    padding: 20,
    height: 20,
  },
  username: {
    alignSelf: 'flex-start',
    padding: 20,
    paddingTop: 6,
    height: 20,
  },
  divider: {
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: colors.outline
  }
});

export default AdoptCard;
