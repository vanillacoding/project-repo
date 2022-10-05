import _ from "lodash";
import * as actionTypes from "../constants/actionTypes";

const initialState = {
  userStreaming: null,
  streamings: [],
  err: null,
};

const streaming = (state = initialState, action) => {
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case actionTypes.FETCH_STREAMINGS_SUCCESS:
      copiedState.streamings = action.payload;
      copiedState.err = null;

      return copiedState;
    case actionTypes.GENERATE_STREAMING_SUCESS:
      copiedState.userStreaming = action.payload;
      copiedState.err = null;

      return copiedState;
    case actionTypes.REMOVE_STREAMING_SUCCESS:
      copiedState.userStreaming = null;
      copiedState.err = null;

      return copiedState;
    case actionTypes.FETCH_STREAMINGS_FAIL:
    case actionTypes.GENERATE_STREAMING_FAIL:
    case actionTypes.REMOVE_STREAMING_FAIL:
      copiedState.err = action.payload;

      return copiedState;
    default:
      return copiedState;
  }
};

export default streaming;
