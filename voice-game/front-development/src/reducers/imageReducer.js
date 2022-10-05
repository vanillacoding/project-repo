import getActionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  littleForest: {},
  monsterEscape: {},
  energyBattle: {},
  isLoaded: { littleForest: false, monsterEscape: false, energyBattle: false },
};

const imageReducer = (state = initialState, action) => {
  const ACTION_TYPES = getActionTypes();
  const copiedState = _.cloneDeep(state);

  switch (action.type) {
    case ACTION_TYPES.STORE_IMAGE:
      const { name, image } = action.payload;
      copiedState[name] = image;
      copiedState.isLoaded[name] = true;

      return copiedState;
    default:
      return copiedState;
  }
};

export default imageReducer;
