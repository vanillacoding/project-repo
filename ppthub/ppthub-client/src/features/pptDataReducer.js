import { createAction, createReducer } from "@reduxjs/toolkit";

import PPT_DATA_TYPES from "../config/constants/pptDataTypes";
import { initializeDiffData } from "./diffDataReducer";
import { changePreviousSequence, initializeSequence } from "./sequenceReducer";

export const registerData = createAction("registerData");
export const deleteData = createAction("deleteData");

const initialState = {
  [PPT_DATA_TYPES.ORIGINAL_PPT_DATA]: {},
  [PPT_DATA_TYPES.COMPARABLE_PPT_DATA]: {},
  [PPT_DATA_TYPES.MERGED_PPT_DATA]: {},
};

const pptDataReducer = createReducer(initialState, {
  [registerData]: (state, action) => {
    const { type, data, pptId } = action.payload;

    return Object.assign(state, {
      [type]: { pptId, data },
    });
  },
  [deleteData]: (state, action) => {
    return Object.assign(state, {
      [action.payload]: {},
    });
  },
  [changePreviousSequence]: (state) => {
    if (Object.keys(state[PPT_DATA_TYPES.MERGED_PPT_DATA]).length) {
      return state;
    }
    if (Object.keys(state[PPT_DATA_TYPES.COMPARABLE_PPT_DATA]).length) {
      return Object.assign(state, {
        [PPT_DATA_TYPES.COMPARABLE_PPT_DATA]: {},
        [PPT_DATA_TYPES.MERGED_PPT_DATA]: {},
      });
    }
    if (Object.keys(state[PPT_DATA_TYPES.ORIGINAL_PPT_DATA]).length) {
      return Object.assign(state, initialState);
    }

    return state;
  },
  [initializeDiffData]: (state, action) => {
    if (Object.keys(action.payload).length === 0) {
      return initialState;
    }

    return state;
  },
  [initializeSequence]: () => {
    return initialState;
  },
});

export default pptDataReducer;
