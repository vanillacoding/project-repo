import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import battleReducer from './battleSlice';

export default configureStore({
  reducer: {
    quiz: quizReducer,
    battle: battleReducer,
  },
});
