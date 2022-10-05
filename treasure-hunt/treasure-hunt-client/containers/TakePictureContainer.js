import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import { takePictures } from '../actions';
import message from '../constants/message';
import { COLOR } from '../constants';

const { width } = Dimensions.get('window');

export default function TakePictureScreen({ navigation }) {
  const dispatch = useDispatch();
  const cameraEl = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const onTakePictureAndCreateAlbum = async() => {
    try {
      if(!isActive) {
        setIsActive(true);
        const { uri } = await cameraEl.current.takePictureAsync();
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width } }],
          { compress: 0, format: ImageManipulator.SaveFormat.PNG }
        );
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.createAlbumAsync('my_treasure', asset, false);
        if (album) {
          alert(message.createPicture);
          dispatch(takePictures(resizedPhoto.uri));
          setIsActive(false);
          return navigation.navigate('Hide', { screen: 'InputDetail' });
        }
      }
    } catch(error) {
      console.warn(error);
      alert(message.failPicture);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        style={{ flex: 1 }}
        ref={cameraEl}
      />
      <TouchableOpacity
        onPress={onTakePictureAndCreateAlbum}
        style={styles.buttonContainer}>
        <FontAwesome
          name="camera"
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    color: COLOR.WHITE,
    fontSize: 50
  }
});
