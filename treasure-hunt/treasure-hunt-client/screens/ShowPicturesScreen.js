import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import Pictures from '../components/Pictures';
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR } from '../constants';

export default function ShowPicturesScreen({ navigation, route }) {
  const { urlList } = route.params;

  const onClose = async() => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
      >
        <Pictures
          uriList={urlList}
          style={styles.pictures}
          isInput={false}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={onClose}
        style={styles.buttonContainer}>
        <MaterialIcons
          name="backspace"
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight,
  },
  pictures: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    right: 20,
  },
  button: {
    color: COLOR.BLUE,
    fontSize: 40
  }
});
