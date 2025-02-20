import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import graphReducer from './slices/graphSlice';

// Create and configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    graph: graphReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 