import actionTypes from '../Constants/actionTypes';
const { ADD_WORD, REMOVE_WORD } = actionTypes;

function myWordsReducer(state = {}, action) {
  switch (action.type) {
    case ADD_WORD:
      if (!state[action.data.word]) {
        return {
          ...state,
          [action.data.word]: action.data,
        };
      } else {
        return { ...state };
      }

    case REMOVE_WORD:
      let clone = Object.assign({}, state);
      clone[action.data] = null;
      delete clone[action.data];
      return clone;

    default:
      return {
        ...state,
      };
  }
}
export default myWordsReducer;
