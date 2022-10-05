import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  metadata: null,
  coinData: null,
  isMetadataLoading: false,
  isPriceLoading: false,
  error: null,
};

const coinReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.GET_DATA:
      return copiedState;

    case ACTION_TYPES.UPDATE_PRICE:
      copiedState.isPriceLoading = true;
      return copiedState;

    case ACTION_TYPES.UPDATE_METADATA:
      copiedState.isMetadataLoading = true;
      return copiedState;

    case ACTION_TYPES.GET_DATA_SUCCESS:
      copiedState.metadata = action.payload.metadata;
      copiedState.coinData = action.payload.coinData;
      return copiedState;

    case ACTION_TYPES.UPDATE_PRICE_SUCCESS:
      copiedState.isPriceLoading = false;
      copiedState.coinData = action.payload;
      return copiedState;

    case ACTION_TYPES.UPDATE_METADATA_SUCCESS:
      copiedState.isMetadataLoading = false;
      copiedState.metadata = action.payload;
      return copiedState;

    case ACTION_TYPES.GET_DATA_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    case ACTION_TYPES.UPDATE_METADATA_FAIL:
    case ACTION_TYPES.UPDATE_PRICE_FAIL:
      copiedState.isMetadataLoading = false;
      copiedState.isPriceLoading = false;
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default coinReducer;
