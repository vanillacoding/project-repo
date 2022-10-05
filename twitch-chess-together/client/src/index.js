import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { CookiesProvider } from 'react-cookie';

import reset from 'styled-reset';

import App from './App';
import createStore from './store';

dotenv.config();

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    display: block;
    height: 100%;
    min-width: 400px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: 'Do Hyeon', sans-serif;
    color: white
  }

  #root {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
`;

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <GlobalStyle />
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
