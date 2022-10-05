import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { userSlice } from './userSlice';
import { habitSlice } from './habitSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['isSuccess', 'isError', 'isFetching']
};

const habitPersistConfig = {
  key: 'habit',
  storage: AsyncStorage,
  blacklist: ['isSuccess', 'isError', 'isFetching']
};

const reducer = {
  user: persistReducer(userPersistConfig, userSlice.reducer),
  habit: persistReducer(habitPersistConfig, habitSlice.reducer)
};

const middleware = [ReduxThunk, createLogger()];

const store = configureStore({
  reducer,
  middleware
});

const persistedStore = persistStore(store);

export { store, persistedStore };
