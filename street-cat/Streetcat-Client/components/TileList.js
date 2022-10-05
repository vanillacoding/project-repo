import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

const TileList = ({ cat, navigation }) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => 
        navigation.navigate('LikedDetail', {
          index: cat._id,
        })
      }
    >
      <View style={styles.tile}>
        <Text style={styles.text}>{cat.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#ff9191',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width /2,
    flex: 1,
    margin: 3,
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
});

export default TileList;
