import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AppContainer from './containers/AppContainer';
import treasures from './reducers/treasures';
import user from './reducers/user';
import message from './constants/message';

const getResorceAndPermission = async() => {
  await Font.loadAsync({
    'righteousRegular': require('./assets/fonts/Righteous-Regular.ttf'),
    'gamja': require('./assets/fonts/GamjaFlower-Regular.ttf'),
    'ptBold': require('./assets/fonts/PTSansNarrow-Bold.ttf'),
    'ptRegular': require('./assets/fonts/PTSansNarrow-Regular.ttf'),
  });

  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL,
    Permissions.LOCATION,
  );

  if (status !== 'granted') return alert(message.deniedPermission);
};

const store = createStore(combineReducers({ treasures, user }));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if(!isLoading) {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getResorceAndPermission}
        onFinish={() => setIsLoading(false)}
        onError={console.warn}
      />
    );
  }
}
