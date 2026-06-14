import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import { omdbApi } from '../api/omdbApi';
import searchReducer from './searchSlice';

export const store = configureStore({
   reducer: {
      settings: settingsReducer,
      search: searchReducer,
      [omdbApi.reducerPath]: omdbApi.reducer,
   },

   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(omdbApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

