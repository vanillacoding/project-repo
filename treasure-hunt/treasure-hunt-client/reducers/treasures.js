import {
  GET_TREASURES,
  GET_SELECTEDTREASURE,
  TAKE_PICTURES,
  INITIAL_PICTURES,
} from '../constants/actionTypes';

const initialState = {
  treasures: [],
  selectedTreasure: {},
  uriList: [],
};

export default function treasures(state = initialState, action) {
  switch (action.type) {
    case GET_TREASURES:
      return { ...state, treasures: action.treasures };
    case GET_SELECTEDTREASURE:
      return { ...state, selectedTreasure: action.selectedTreasure };
    case TAKE_PICTURES:
      let newUriList = [...state.uriList];
      newUriList = newUriList.concat(action.uri);
      return { ...state, uriList: newUriList };
    case INITIAL_PICTURES:
      return { ...state, uriList: [] };
    default:
      return state;
  }
}
