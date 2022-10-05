import React from 'react';
import { APP_ID } from 'react-native-dotenv';
import { API } from '../constants';
import * as Facebook from 'expo-facebook';
import { useDispatch, useSelector } from 'react-redux';
import saveToken from '../utils/saveToken';
import { 
  logInSuccess, 
  logInSuccessUser, 
  logInSuccessCat, 
  locationSuccess, 
  loading,
} from '../actions';
import useFetch from '../utils/useFetch';
import Loading from '../components/Loading';
import LoginScreen from '../screens/LoginScreen';
import { Alert } from 'react-native';

const LoginContainer = () => {
  const { isLoading } = useSelector((state) => state.render);                                                                                                                                                                                                                                                                                                                                     
  const dispatch = useDispatch();
  const saveLocation = (location) => {
    dispatch(locationSuccess(location));
  };

  useFetch(saveLocation);
  
  const changeLoadingStatus = () => {
    dispatch(loading());
  };

  const fetchFacebookData = async () => {
    try {
      await Facebook.initializeAsync(APP_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        changeLoadingStatus();
        const fetchedData = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const { id, name } = await fetchedData.json();
        const response = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ facebookId: id, name }),
        });

        const { result, user, cats, accessToken } = await response.json();
        if (result !== 'ok') {
          throw new Error();
        }

        dispatch(logInSuccessUser(user));
        dispatch(logInSuccessCat(cats));
        dispatch(logInSuccess());
        saveToken('token', accessToken, 'userId', user.mongoId);
        changeLoadingStatus();
      } 
    } catch (error) {
      changeLoadingStatus();
      Alert.alert('로그인 에러입니다. 다시 시도해주세요');
    }
  };

  return isLoading ? <Loading /> : <LoginScreen fetchFacebookData={fetchFacebookData} />;
};

export default LoginContainer;
