import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Permissions from 'expo-permissions';

import { ALERT_SET_PERMISSION } from './constants/index';
import reducer from './reducers/index';
import RootNavigation from './navigation/RootNavigation';

const store = createStore(reducer);

export default function App() {
  const [ isLoaded, setIsLoaded ] = useState(false);

  const getAssets = async () => {
    await Font.loadAsync({
      'googleFont': require('./assets/fonts/Poppins/Poppins-Medium.ttf')
    });
  };

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.NOTIFICATIONS
    );

    if (status !== 'granted') {
      alert(ALERT_SET_PERMISSION);
      checkPermissions();
    }
  };
  const checkPermissions = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.LOCATION,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.NOTIFICATIONS
    );

    if (status !== 'granted') {
      askPermission();
    } else {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getAssets();
    checkPermissions();
  }, []);

  return (!isLoaded
    ? <AppLoading/>
    : <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
  );
}
