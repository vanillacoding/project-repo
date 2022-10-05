import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
