import { combineReducers } from 'redux';
import { user } from './user';
import { book } from './book';
import { bookReports } from './bookReports';

const reducer = combineReducers({
  user,
  book,
  bookReports
});

export default reducer
