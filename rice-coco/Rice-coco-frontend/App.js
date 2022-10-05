import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import * as TaskManager from 'expo-task-manager';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store/';
import { setUserLocation } from './src/actions/index';
import MainNavigation from './src/navigation/TabNavigation';
import { BACKGROUND_LOCATION_TASK } from './src/constants';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }) => {
  if (error) {
    alert(error.message);
    return;
  }

  const { latitude, longitude } = data.locations[0].coords;
  store.dispatch(setUserLocation({ latitude, longitude }));
});

export default App;
