import { createReducer } from "@reduxjs/toolkit";

import PPT_DATA_TYPES from "../config/constants/pptDataTypes";
import { registerData } from "./pptDataReducer";
import { initializeSequence } from "./sequenceReducer";

const slideOrderListReducer = createReducer([], {
  [registerData]: (state, action) => {
    const { type, data } = action.payload;
    const slideIds = data?.slides.map((slide) => slide.slideId) ?? [];
    const slideIdsSet = new Set(slideIds);

    switch (type) {
      case PPT_DATA_TYPES.ORIGINAL_PPT_DATA:
        return Array.from(slideIds);
      case PPT_DATA_TYPES.COMPARABLE_PPT_DATA:
        return state.reduce((orderedList, slideId, index, array) => {
          if (!slideIdsSet.has(slideId)) {
            return index === array.length - 1
              ? orderedList.concat([slideId, ...slideIds])
              : orderedList.concat(slideId);
          }

          const slideIdsIndex = slideIds.indexOf(slideId);

          return index === array.length - 1
            ? orderedList.concat(slideIds)
            : orderedList.concat(slideIds.splice(0, slideIdsIndex + 1));
        }, []);
      default:
        return state;
    }
  },
  [initializeSequence]: () => {
    return [];
  },
});

export default slideOrderListReducer;
