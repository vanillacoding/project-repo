import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  searchList: [],
  err: null,
};

const search = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.SEARCH_USERS_SUCCESS:
      copiedState.searchList = action.payload;
      copiedState.err = null;

      return copiedState;
    case actionTypes.SEARCH_USERS_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    default:
      return copiedState;
  }
};

export default search;
