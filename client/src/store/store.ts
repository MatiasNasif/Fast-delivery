import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import logger from 'redux-logger';

export const store = configureStore({
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: false,
    }).concat(logger),
  reducer: { user: userReducer },
});
