'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import storage from '@/store/customStorage';

import { globalApi } from '@/api';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [globalApi.reducerPath],
};

const rootReducer = combineReducers({
  // TODO: REMOVE ONCE A REAL REDUCER IS READY. DELETE FOLDER TOO
  // THIS IS USELESS. REMOVE ONCE A REAL REDUCER IS READY
  [globalApi.reducerPath]: globalApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(globalApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
