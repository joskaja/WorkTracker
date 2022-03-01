import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import apiAuth from '../middleware/apiRequestAuthMiddleware';


export const store = configureStore({
  reducer: {
    auth: authReducer
    },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiAuth)
});
