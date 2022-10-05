import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import syrian from '../assets/tape/syrian.png';
import jungle from '../assets/tape/jungle.png';
import robo from '../assets/tape/robo.png';
import other from '../assets/tape/other.png';
import colors from '../theme/color';

const PhotoCard = ({ uri, type }) => {
  const labelByTypes = [robo, jungle, syrian, other];

  let typeIndex;
  if (type === 'Robo') {
    typeIndex = 0;
  } else if (type === 'Jungle') {
    typeIndex = 1;
  } else if (type === 'Syrian') {
    typeIndex = 2;
  } else {
    typeIndex = 3;
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.tape}
        source={labelByTypes[typeIndex]}
      />
      <View style={styles.card}>
        <Image
          style={styles.stretch}
          source={{ uri }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    backgroundColor: colors.outline,
  },
  tape: {
    width: '40%',
    height: 20,
    top: 12,
    zIndex: 1,
  },
  stretch: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default PhotoCard;
