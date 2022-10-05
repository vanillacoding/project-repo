import actionTypes from '../Constants/actionTypes';

const initialState = {
  isReadyToGetVideos: false,
  isReadyToPostWord: false,
  isReadyToDeleteWord: { value: false, target: null },
};
const { REQUEST_VIDEOS, REQUEST_POST_WORD, REQUEST_DELETE_WORD } = actionTypes;

function requestReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_VIDEOS:
      return {
        ...state,
        isReadyToGetVideos: true,
      };

    case REQUEST_POST_WORD:
      let { word, myWords } = action.data;
      if (myWords[word]) {
        return { ...state };
      } else {
        return {
          ...state,
          isReadyToPostWord: true,
        };
      }

    case REQUEST_DELETE_WORD:
      return {
        ...state,
        isReadyToDeleteWord: {
          value: true,
          target: action.data,
        },
      };

    default:
      return {
        isReadyToGetVideos: false,
        isReadyToPostWord: false,
        isReadyToDeleteWord: false,
      };
  }
}

export default requestReducer;
