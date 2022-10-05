import { combineReducers } from 'redux';

import userReducer from './userReducer';
import groupReducer from './groupReducer';
import memberInRoomReducer from './memberInRoomReducer';
import messageListReducer from './messageListReducer';

const rootReducer = combineReducers({
  userReducer,
  groupReducer,
  memberInRoomReducer,
  messageListReducer
});

export default rootReducer;
