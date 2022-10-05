import produce from "immer";

import * as type from "../constants/actionTypes";

const initialState = {
  list: []
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case type.SAVE_REVIEWS:
      return produce(state, (draft) => {
        let prevReviews = draft.list.slice();

        if (action.page === 1) {
          prevReviews = [];
        }

        draft.list = [ ...prevReviews, ...action.reviews ];
      });
    case type.CREATE_REVIEW:
      return produce(state, (draft) => {
        draft.list.unshift(action.review);
      });
    default:
      return state;
  }
};

export default review;
