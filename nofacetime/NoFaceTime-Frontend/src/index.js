import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppContainer from './containers/AppContainer/AppContainer';
import store from './store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
