

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your authSlice reducer

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your authSlice reducer to the store
   
  },
});

export default store;
