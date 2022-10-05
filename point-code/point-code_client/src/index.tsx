import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import theme from './lib/styles/theme';
import rootReducer from './modules';
import { setUser } from './modules/auth';
import App from './App';
import './index.css';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const setUp = () => {
  const user = localStorage.getItem('user');
  if (!user) return;

  store.dispatch(setUser(JSON.parse(user)));
};

setUp();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);
