import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './App';
import theme from './context/theme';

const GlobalStyle = createGlobalStyle`
  html, body {
    display: block;
    height: 100%;
    min-width: 400px;
    margin: 0;
    padding: 0;
    background-color: ${theme.background.grey1};
    list-style: none;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
