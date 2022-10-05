import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  allCryptoFolios: [],
  error: null,
};

const cryptofolioReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.DELETE_CRYPTOFOLIO:
    case ACTION_TYPES.CREATE_CRYPTOFOLIO:
    case ACTION_TYPES.GET_CRYPTOFOLIOS:
      return copiedState;

    case ACTION_TYPES.DELETE_CRYPTOFOLIO_SUCCESS:
      copiedState.allCryptoFolios = copiedState.allCryptoFolios.filter(
        (folio) => folio._id !== action.payload
      );
      return copiedState;

    case ACTION_TYPES.CREATE_CRYPTOFOLIO_SUCCESS:
      copiedState.allCryptoFolios.push(action.payload);
      return copiedState;

    case ACTION_TYPES.GET_CRYPTOFOLIOS_SUCCESS:
      copiedState.allCryptoFolios = action.payload;
      return copiedState;

    case ACTION_TYPES.GET_CRYPTOFOLIOS_FAIL:
    case ACTION_TYPES.CREATE_CRYPTOFOLIO_FAIL:
    case ACTION_TYPES.DELETE_CRYPTOFOLIO_FAIL:
      copiedState.error = action.payload;
      return copiedState;

    default:
      return copiedState;
  }
};

export default cryptofolioReducer;
