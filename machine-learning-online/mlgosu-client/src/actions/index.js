import * as types from '../constants/actionTypes';

export const getRawData = data => ({
  type: types.LOAD_DATA,
  data
});
