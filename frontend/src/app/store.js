import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import dateReducer from '../features/Date/dateSlice';
import apiAuth from '../middleware/apiRequestAuthMiddleware';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    date: dateReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiAuth)
});
