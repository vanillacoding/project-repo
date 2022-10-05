import { combineReducers } from 'redux';

import user from './user';
import selectedPhotos from './selectedPhotos';

export default combineReducers({
  user,
  selectedPhotos
});
