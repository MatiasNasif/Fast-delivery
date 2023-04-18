import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import formSwornReducer from './formSworn';
import logger from 'redux-logger';
import dateReducer from './dateSelected';
import packageReducer from './packageIdSelected';

export const store = configureStore({
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    user: userReducer,
    form: formSwornReducer,
    date: dateReducer,
    package: packageReducer,
  },
});
