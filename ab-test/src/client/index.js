import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import './index.scss';
import AppContainer from './containers/AppContainer';
import reducer from './reducers/index';

const store = createStore(reducer, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
