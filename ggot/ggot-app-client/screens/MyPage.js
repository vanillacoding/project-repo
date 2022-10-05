import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import Button from '../components/Button';
import { getUserLogout } from '../actions/index';
import { LOGIN_DATA } from '../constants/index';

const { FACEBOOK_APP_ID } = getEnvVars();

export default function MyPage({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  const logOut = async () => {
    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID
      });
      await Facebook.logOutAsync();
      await AsyncStorage.removeItem(LOGIN_DATA);
    } catch (err) {
      console.warn(err);
    }

    dispatch(getUserLogout());
  };
  const onChangeMyPhoto = () => navigation.navigate('MyPhoto');

  const buttonTypes = [
    {title: '내 꽂', property: onChangeMyPhoto},
    {title: '로그아웃', property: logOut}
  ];

  return (
    userData &&
    <View style={styles.contentWrapper}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userData.profile_url}}
          style={styles.image}
        />
        <Text style={styles.emailContainer}>
          {userData.email}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {
          buttonTypes.map((item, key) => {
            return (
              <Button
                title={item.title}
                onChange={item.property}
                key={key}
              />
            );
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F0'
  },
  profileContainer: {
    flex: 2,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#BEDFF7'
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  emailContainer: {
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 20,
    fontSize: 15
  },
  buttonContainer: {
    flex: 2,
    width: '80%',
    marginBottom: 40
  }
});
