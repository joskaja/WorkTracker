import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import workSessionsReducer from '../features/WorkSessions/workSessionsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    workSessions: workSessionsReducer
  }
});
