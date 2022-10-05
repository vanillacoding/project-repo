import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './styles/theme';
import store from './store';
import App from './components/App';
import { HeaderFont, ArticleFont } from './styles/fonts';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <HeaderFont />
        <ArticleFont />
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
