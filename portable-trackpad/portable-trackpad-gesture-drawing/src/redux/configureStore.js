import { configureStore } from "@reduxjs/toolkit";
import lineStyleReducer from "./reducers/lineStyle";
import selectedToolReducer from "./reducers/selectedTool";
import isFoldSideBarReducer from "./reducers/isFoldSideBar";

const store = configureStore({
  reducer: {
    lineStyle: lineStyleReducer,
    selectedTool: selectedToolReducer,
    isFoldSideBar: isFoldSideBarReducer,
  },
});

export default store;
