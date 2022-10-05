import { combineReducers } from 'redux';
import { chatReducer } from './chatReducer';
import { userReducer } from './userReducer';
import { modalReducer } from './modalReducer';

export default combineReducers({
  chatReducer,
  userReducer,
  modalReducer
});
