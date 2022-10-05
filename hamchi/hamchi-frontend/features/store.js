import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import { userSlice } from './userSlice';
import { postSlice } from './postSlice';
import { chatSlice } from './chatSlice';
import { filteredPostSlice } from './filteredPostSlice';
import { createLogger } from 'redux-logger';

const middleware = [ReduxThunk];

const store = configureStore({
  reducer:
  {
    user: userSlice.reducer,
    post: postSlice.reducer,
    chat: chatSlice.reducer,
    filteredPost: filteredPostSlice.reducer
  },
  middleware: middleware
});

export default store;
