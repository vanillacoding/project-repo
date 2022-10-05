import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const List = ({ cat, navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => 
        navigation.navigate('Detail', {
          index: cat._id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={{ uri: cat.image }} style={styles.image} />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>냥이이름: {cat.name}</Text>
          <Text style={styles.text}>좋아요: {cat.likes.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 16,
    borderColor: '#ff9191',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBox: {
    width: '35%', 
    height: 80, 
    borderRadius: 50,
  },
  image: {
    height: 80, 
    borderRadius: 50,
  },
  textBox: {
    width: '55%',
  },
  text: {
    fontSize: 20, 
    padding: 5,
  },
});

export default List;
