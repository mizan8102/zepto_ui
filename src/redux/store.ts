// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import fontsReducer from './fontsSlice';

const store = configureStore({
  reducer: {
    fonts: fontsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
