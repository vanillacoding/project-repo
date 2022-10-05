import { combineReducers } from '@reduxjs/toolkit';

import user from './modules/user';
import plants from './modules/plants';
import environments from './modules/environments';
import search from './modules/search';
import images from './modules/images';
import date from './modules/date';
import timeTravel from './modules/timeTravel';

export default combineReducers({
  user,
  plants,
  search,
  images,
  date,
  timeTravel,
  environments,
});
