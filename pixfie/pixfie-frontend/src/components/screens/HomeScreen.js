import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from '../layouts/Header';
import { setPhoto, setFontLoaded } from '../../actions/index';
import { getPermissionAsync, openCamera, pickImage } from '../../utils/index';

const customFonts = {
  'slkscr': require('../../../android/app/src/main/assets/fonts/slkscr.ttf'),
};

export function HomeScreen (props) {
  const {
    fontLoaded,
    loggedIn,
    setPhoto,
    setFontLoaded,
    navigation
  } = props;

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync(customFonts);
      setFontLoaded(true);
    };

    loadFont();
    getPermissionAsync();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <Text style={styles.title}>pixfie</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCamera} onPress={() => openCamera(loggedIn, setPhoto, navigation)}>
            <Text style={styles.buttonText}>사진 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGallery} onPress={() => pickImage(loggedIn, setPhoto, navigation)}>
            <Text style={styles.buttonText}>사진 가져오기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    fontLoaded: state.fontLoaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhoto: photo => { dispatch(setPhoto(photo)); },
    setFontLoaded: fontLoaded => { dispatch(setFontLoaded(fontLoaded)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#2c2c2c',
    fontSize: 80,
    marginTop: '10%',
    marginBottom: 40,
    fontWeight: '300',
    fontFamily: 'slkscr',
    textAlign: 'center',
  },
  buttonCamera: {
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: '#D9843B',
  },
  buttonGallery: {
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: '#14A647'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
