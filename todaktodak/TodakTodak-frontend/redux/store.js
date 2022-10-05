import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import { userSlice } from "./userSlice";
import { categoryPostSlice } from "./categoryPostSlice";

const reducer = {
  user: userSlice.reducer,
  post: categoryPostSlice.reducer
};

const middleware = [thunk, createLogger()];

const store = configureStore({
  reducer,
  middleware
});

export default store;
