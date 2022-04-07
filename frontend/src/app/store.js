import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import dateReducer from '../features/Date/dateSlice';
import workSessionsReducer from '../features/WorkSessions/workSessionsSlice';
import apiAuth from '../middleware/apiRequestAuthMiddleware';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    date: dateReducer,
    workSessions: workSessionsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiAuth)
});
