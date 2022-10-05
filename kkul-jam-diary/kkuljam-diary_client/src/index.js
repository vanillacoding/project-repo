import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './reducers/index';
import AppContainer from './containers/AppContainer';

const middleware = [];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'latelySleep'
  ],
  blacklist: [
    'user'
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
  middleware.push(thunk);
}

const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <AppContainer />
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
