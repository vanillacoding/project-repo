import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { getAuth, logInFacebook } from '../utils/api';
import { getLoginUser } from '../actions';
import { COLOR, FONT } from '../constants';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const checkLogin = async() => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      if (!currentToken) return;
      const { data } = await getAuth(currentToken);
      await SecureStore.setItemAsync('userToken', data.token);
      dispatch(getLoginUser(data.userInfo));
    } catch(err) {
      if (err.response) {
        alert(err.response.data.errMessage);
        await SecureStore.deleteItemAsync('userToken');
      }
    }
  };
  const onLoginFacebook = async() => {
    try {
      const { data } = await logInFacebook();
      await SecureStore.setItemAsync('userToken', data.token);
      dispatch(getLoginUser(data.userInfo));
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Treasure</Text>
        <Text style={styles.title}>Hunt</Text>
      </View>
      <View style={styles.loginConatiner}>
        <FontAwesome.Button
          name="facebook"
          backgroundColor="#3b5998"
          onPress={onLoginFacebook}
        >
          <Text style={styles.login}>Login with Facebook</Text>
        </FontAwesome.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BLUE,
  },
  titleContainer: {
    flex: 1,
    marginTop: 150,
  },
  title: {
    marginRight: 15,
    textAlign: 'center',
    fontSize: 50,
    color: COLOR.WHITE,
    fontFamily: FONT.RIGHT,
  },
  loginConatiner: {
    marginBottom: 100
  },
  login: {
    fontSize: 20,
    color: COLOR.WHITE,
    fontFamily: FONT.RIGHT,
  }
});
