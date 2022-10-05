import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { setPhoto, setFaceType } from '../../actions/index';
import { openCamera, pickImage } from '../../utils/index';
import { fetchImage } from '../../utils/api';

export function ReadyScreen (props) {
  const {
    loggedIn,
    photoUrl,
    setPhoto,
    setFaceType,
    navigation
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
      {photoUrl &&
        <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200 }} />}
      </View>
      <TouchableOpacity style={styles.buttonReady} onPress={() => fetchImage(photoUrl, loggedIn, setFaceType, navigation)}>
        <Text style={styles.buttonText}>픽셀 프로필 만들기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCamera} onPress={() => openCamera(loggedIn, setPhoto, navigation)}>
        <Text style={styles.buttonText}>사진 다시 찍기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGallery} onPress={() => pickImage(loggedIn, setPhoto, navigation)}>
        <Text style={styles.buttonText}>사진 다시 가져오기</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    photoUrl: state.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); },
    setFaceType: faceType => { dispatch(setFaceType(faceType)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadyScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    marginBottom: 20
  },
  buttonReady: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#4968A6',
    elevation: 1
  },
  buttonCamera: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F2C53D',
    elevation: 1
  },
  buttonGallery: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#14A647',
    elevation: 1
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  title: {
    color: '#2c2c2c',
    fontSize: 70,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    fontFamily: 'slkscr',
    textAlign: 'center'
  },
});
