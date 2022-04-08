import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import dateReducer from '../features/Date/dateSlice';
import workSessionsReducer from '../features/WorkSessions/workSessionsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    date: dateReducer,
    workSessions: workSessionsReducer
  }
});
