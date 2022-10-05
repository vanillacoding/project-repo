import { combineReducers } from 'redux';
import { user } from '../reducers/user';
import { location } from '../reducers/location';
import { meetings } from '../reducers/meetings';

export default combineReducers({
  user,
  location,
  meetings,
});
