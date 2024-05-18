// Import necessary function from Redux Toolkit for creating the store
import { configureStore } from '@reduxjs/toolkit';

// Import the authReducer from authSlice
import authReducer from './authSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        auth: authReducer, // Set the authReducer under the 'auth' slice of the store
    }
});

// Export the configured Redux store
export default store;
