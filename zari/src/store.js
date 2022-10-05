import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from "redux-logger";

import userReducer from './reducers/userSlice';
import roomsReducer from './reducers/roomsSlice';
import videoChatReducer from './reducers/videoChatSlice';
import modalReducer from './reducers/modalSlice';

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export default configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    videoChat: videoChatReducer,
    modal: modalReducer,
  },
  middleware,
});
