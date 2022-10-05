import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import colors from '../theme/color';

export default function Picture({ route, navigation }) {
  const cameraRef = useRef(null);
  const { redirectTo } = route.params;

  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.3,
      base64: true
    });

    setPhoto(photo.base64);
    navigation.navigate(
      'Preview',
      {
        photo: photo,
        redirectTo: redirectTo
      });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>카메라 접근 권한이 없습니다.</Text>;
  }
  return (
    <>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
          ratio={'1:1'}
        >
        </Camera>
      </View >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.snap}
          onPress={takePicture}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    flexGrow: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  snap: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: colors.main
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  taken: {
    width: 100,
    height: 180,
    backgroundColor: 'white'
  },
  stretch: {
    width: 120,
    height: 180,
    resizeMode: 'stretch',
  },
});
