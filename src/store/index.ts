import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import { omdbApi } from '../api/omdbApi';

export const store = configureStore({
   reducer: {
      settings: settingsReducer,
      // Модуль запросов (ключ берется динамически из конфигурации самого API)
      [omdbApi.reducerPath]: omdbApi.reducer,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(omdbApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;