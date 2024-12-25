import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import stockReducer from '../features/Stock/StockSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['subscriptions', 'stocks'],
};

const persistedReducer = persistReducer(persistConfig, stockReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
