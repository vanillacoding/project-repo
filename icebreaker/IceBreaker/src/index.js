import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../src/store';

import './config/firebase';

import initReactFastclick from 'react-fastclick';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';

import App from './components/App';

initReactFastclick();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
