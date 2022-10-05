import React from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';

import { signInFacebook } from '../utils/facebookLogIn';

export default function LogIn() {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splash.png')}
        style={styles.imageBackground}
        >
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => signInFacebook(dispatch)}
        >
          <Image
            style={styles.loginButton}
            source={require('../assets/images/loginButton.png')}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtonContainer: {
    backgroundColor: '#DDDDDD',
  },
  loginButton: {
    width: 280,
    height: 50
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
