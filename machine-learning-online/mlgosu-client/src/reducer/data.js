import { combineReducers } from 'redux';
import { LOAD_DATA } from '../constants/actionTypes'

const rawdata = (state = [], action) => {
  switch(action.type) {
    case LOAD_DATA:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  rawdata
});
