import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Facebook, SecureStore } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { FACEBOOK_APP_ID } from '../config';

export default class LoginScreen extends Component {
  async _login() {
    const { navigation } = this.props;
    const { setUserInfo } = this.props.screenProps;

    try {
      const {
        type,
        token
      } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile']
      });

      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const userInfo = await response.json();
        const { id, name } = userInfo;

        const res = await fetch(`http://piccle-production.eu-west-1.elasticbeanstalk.com/api/auth/login`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            facebookId: id,
            userName: name
          })
        });
        const json = await res.json();
        const { access_token, userId, userName } = json;

        try {
          if (access_token) {
            SecureStore.setItemAsync('ACCESS_TOKEN', access_token);
            setUserInfo(userId, userName);
            navigation.navigate('MainScreen');
          }
        } catch ({ message }) {
          throw `Expo Secure Error: ${message}`;
        }
      } else {
        throw new Error('Facebook Login Failed');
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <ImageBackground source={require('../assets/login.png')} style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._login.bind(this)}>
          <Entypo name="facebook" size={17} color="#fff" />
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  title: {
    margin: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  button: {
    justifyContent: 'center',
    flexDirection:'row',
    width: '55%',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#3b5998',
    borderRadius: 5
  },
  buttonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
