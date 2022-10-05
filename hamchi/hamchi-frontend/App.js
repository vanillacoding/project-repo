import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import AppNavigator from './navigations/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
