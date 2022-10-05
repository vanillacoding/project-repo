import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import reducer from '../reducers';

const middleware = [];

// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

export default createStore(reducer);
