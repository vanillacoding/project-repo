import { configureStore } from '@reduxjs/toolkit';
import navReducer from '../features/nav/navSlice';
import mazeOptionsReducer from '../features/mazeOptions/mazeOptionsSlice';
import mazeReducer from '../features/maze/mazeSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    mazeOptions: mazeOptionsReducer,
    maze: mazeReducer,
  },
});
