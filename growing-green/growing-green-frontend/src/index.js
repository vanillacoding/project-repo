import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './configs/firebase';

import AppPage from './pages/AppPage';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppPage />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
