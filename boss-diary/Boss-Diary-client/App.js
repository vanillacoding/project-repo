import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

import AppContainer from './containers/App';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
