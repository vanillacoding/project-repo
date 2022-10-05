import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducer from './reducer';
import App from './container/AppContainer'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';

const history = createBrowserHistory();

const store = createStore(connectRouter(history)(reducer), compose(applyMiddleware(logger, routerMiddleware(history))));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
