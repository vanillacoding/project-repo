import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';

import App from './App';

const Root = () => {
  return (
    <App />
  );
}

registerRootComponent(Root);
