import { combineReducers } from 'redux';
import user from './user';
import render from './render';
import cat from './cat';
import comment from './comment';

export default combineReducers({
  user,
  render,
  cat,
  comment,
});
