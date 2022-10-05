import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers/index';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default createStore(reducer, applyMiddleware(...middlewares));
