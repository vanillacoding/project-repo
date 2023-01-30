import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import sequenceReducer from "../features/sequenceReducer";
import pptDataReducer from "../features/pptDataReducer";
import diffDataReducer from "../features/diffDataReducer";
import slideOrderListReducer from "../features/slideOrderListReducer";

const reducer = {
  sequence: sequenceReducer,
  pptData: pptDataReducer,
  diffData: diffDataReducer,
  slideOrderList: slideOrderListReducer,
};

const store = configureStore({
  reducer,
  middleware: [logger],
});

export default store;
