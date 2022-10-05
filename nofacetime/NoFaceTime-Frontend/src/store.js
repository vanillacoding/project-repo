import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));
