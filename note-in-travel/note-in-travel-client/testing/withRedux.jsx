import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import userReducer from "../src/reducers/userSlice";
import myCoursesReducer from "../src/reducers/myCoursesSlice";
import favoriteCoursesReducer from "../src/reducers/favoriteCoursesSlice";
import favoriteSitesReducer from "../src/reducers/favoriteSitesSlice";

function ReduxWith(component, options = {}) {
  const store = configureStore({
    reducer: {
      user: userReducer,
      myCourses: myCoursesReducer,
      favoriteCourses: favoriteCoursesReducer,
      favoriteSites: favoriteSitesReducer,
    },
    ...options,
  });

  return <Provider store={store}>{component}</Provider>;
}

export default ReduxWith;
