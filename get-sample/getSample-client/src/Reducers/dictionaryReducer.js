import actionTypes from '../Constants/actionTypes';
const {
  LOADED_DICTIONARY_DATA,
  RESET_STATE_OF,
  DICTIONARY,
  ADD_VIDEO_INFO_TO_DICTIONARY,
} = actionTypes;

export function dictionaryReducer(state = null, action) {
  switch (action.type) {
    case LOADED_DICTIONARY_DATA:
      return action.data;

    case `${RESET_STATE_OF}_${DICTIONARY}`:
      return null;

    case ADD_VIDEO_INFO_TO_DICTIONARY:
      return {
        videosInfo: action.data,
        ...state,
      };

    default:
      return state;
  }
}
export default dictionaryReducer;
