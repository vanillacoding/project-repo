import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducer/index';

const persistConfig = {
  key: 'root',
  storage
};

const enhancedReducer = persistReducer(persistConfig, reducer);

export default function configureStore() {
  const store = createStore(enhancedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}
