import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import localStorageMiddleware from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});