import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { blockSlice } from "../features/block/blockSlice";

const store = configureStore({
  reducer: {
    block: blockSlice.reducer,
  },
  middleware: [logger],
});

export { store };
