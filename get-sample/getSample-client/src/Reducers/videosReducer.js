import actionTypes from '../Constants/actionTypes';
import stateNames from '../Constants/stateNames';

const initialState = {
  foundWord: null,
  info: [],
};
const { LOADED_VIDEO_DATA, RESET_STATE_OF } = actionTypes;
const { VIDEOS } = stateNames;

function videosReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_VIDEO_DATA:
      return action.data;

    case `${RESET_STATE_OF}_${VIDEOS}`:
      return {
        foundWord: null,
        info: [],
      };

    default:
      return {
        ...state,
      };
  }
}

export default videosReducer;
