import { combineReducers } from 'redux';
import user from './user';
import latelySleep from './latelySleep';

const rootReducer = combineReducers({
  user,
  latelySleep
});

export default rootReducer;
