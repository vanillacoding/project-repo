import { combineReducers } from 'redux';
import user from './user';
import country from './country';

export default combineReducers({
  user,
  country
});
