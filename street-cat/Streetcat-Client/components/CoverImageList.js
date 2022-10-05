import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CoverImageList = ({ cat, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => 
        navigation.navigate('myCatDetail', {
          index: cat._id,
        })
      }
    >
      <Image source={{ uri: cat.image }} style={styles.image} />
      <Text style={styles.text}>{cat.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 270, 
    resizeMode: 'cover',
  },
  text: {
    fontSize: 30, 
    padding: 5, 
    textAlign: 'center',
  },
});

export default CoverImageList;
