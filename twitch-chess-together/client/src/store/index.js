import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return process.env.REACT_APP_NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(sagaMiddleware)
      : getDefaultMiddleware();
  },
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});

const createStateStore = () => {
  const createdStore = store;
  sagaMiddleware.run(rootSagas);
  return createdStore;
};

export default createStateStore;
