// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import timeEntriesReducer from './slices/timeEntriesSlice';

export const store = configureStore({
  reducer: {
    timeEntries: timeEntriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

