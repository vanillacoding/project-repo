import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NativeModules } from 'react-native';
import {
  GET_DEVICE_ADDRESS,
  SET_NICKNAME,
  SET_ERROR_MESSAGE,
  SET_MY_LOCATIN
} from '../constants/actionTypes';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import HomeScreen from '../screens/HomeScreen';

export default function HomeContainer({ navigation }) {
  const { errorMessage } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const changeNickname = (nickname) => {
    dispatch({ type: SET_NICKNAME, data: nickname });
  };

  const setErrorMessage = (message) => {
    dispatch({ type: SET_ERROR_MESSAGE, data: message });
  };

  const getDeviceAddress = () => {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    const address = scriptURL.split('://')[1].split('/')[0].split(':')[0];

    dispatch({ type: GET_DEVICE_ADDRESS, data: address });
  };

  const checkPermissionAndGetLocation = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        alert('Permission to access location is required!');
      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest
        });
        const myLocation = {
          latitude: parseFloat(location.coords.latitude),
          longitude: parseFloat(location.coords.longitude)
        };

        dispatch({ type: SET_MY_LOCATIN, data: myLocation });
      }
    } catch (err) {
      setErrorMessage('잠시후 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    getDeviceAddress();
    checkPermissionAndGetLocation();
  }, []);

  return (
    <HomeScreen
      navigation={navigation}
      errorMessage={errorMessage}
      changeNickname={changeNickname}
      setErrorMessage={setErrorMessage}
    />
  );
}
