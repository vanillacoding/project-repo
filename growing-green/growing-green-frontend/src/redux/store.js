import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

let middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, logger];
}

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export default store;
