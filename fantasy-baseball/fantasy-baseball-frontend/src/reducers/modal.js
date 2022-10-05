import produce from "immer";

import {
  SHOW_MODAL,
  HIDE_MODAL,
} from "../constants/actionTypes";

const initialState = {
  isVisible: false,
  title: "",
  contentText: "",
  hasLinkButton: false,
  path: "",
  linkButtonText: "",
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return produce(state, () => action.content);
    case HIDE_MODAL:
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};

export default modal;
