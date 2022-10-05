import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainStackNavigator from './navigations/MainStackNavigator';
import { store, persistedStore } from './featrues/store';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistedStore}
      >
        <MainStackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
