import { createAction, createReducer } from "@reduxjs/toolkit";

import DIFF_TYPES from "../config/constants/diffTypes";
import SEQUENCES from "../config/constants/sequences";
import { changeSequence, initializeSequence } from "./sequenceReducer";

export const initializeDiffData = createAction("initializeDiffData");
export const toggleSlideChecked = createAction("toggleSlideChecked");
export const toggleSlideHovered = createAction("toggleSlideHovered");
export const toggleItemChecked = createAction("toggleItemChecked");
export const toggleItemHovered = createAction("toggleItemHovered");

const initialState = {};

const diffDataReducer = createReducer(initialState, {
  [initializeDiffData]: (state, action) => {
    return action.payload;
  },
  [toggleSlideChecked]: (state, action) => {
    const slideId = action.payload;
    const slideDiff = state[slideId].diff;

    if (slideDiff !== DIFF_TYPES.ADDED && slideDiff !== DIFF_TYPES.DELETED) {
      return state;
    }

    return {
      ...state,
      [slideId]: {
        ...state[slideId],
        isChecked: !state[slideId].isChecked,
      },
    };
  },
  [toggleSlideHovered]: (state, action) => {
    const slideId = action.payload;

    return {
      ...state,
      [slideId]: {
        ...state[slideId],
        isHovered: !state[slideId].isHovered,
      },
    };
  },
  [toggleItemChecked]: (state, action) => {
    const { slideId, itemId } = action.payload;
    const itemDiff = state[slideId].items[itemId].diff ?? {};

    if (
      itemDiff !== DIFF_TYPES.MODIFIED &&
      itemDiff !== DIFF_TYPES.ADDED &&
      itemDiff !== DIFF_TYPES.DELETED
    ) {
      return state;
    }

    return {
      ...state,
      [slideId]: {
        ...state[slideId],
        items: {
          ...state[slideId].items,
          [itemId]: {
            ...state[slideId].items[itemId],
            isChecked: !state[slideId].items[itemId].isChecked,
          },
        },
      },
    };
  },
  [toggleItemHovered]: (state, action) => {
    const { slideId, itemId } = action.payload;
    const itemDiff = state[slideId].items[itemId].diff ?? {};

    if (
      itemDiff !== DIFF_TYPES.MODIFIED &&
      itemDiff !== DIFF_TYPES.ADDED &&
      itemDiff !== DIFF_TYPES.DELETED
    ) {
      return state;
    }

    return {
      ...state,
      [slideId]: {
        ...state[slideId],
        items: {
          ...state[slideId].items,
          [itemId]: {
            ...state[slideId].items[itemId],
            isHovered: !state[slideId].items[itemId].isHovered,
          },
        },
      },
    };
  },
  [changeSequence]: (state, action) => {
    if (action.payload !== SEQUENCES.DOWNLOAD) {
      return state;
    }

    return {};
  },
  [initializeSequence]: () => {
    return initialState;
  },
});

export default diffDataReducer;
