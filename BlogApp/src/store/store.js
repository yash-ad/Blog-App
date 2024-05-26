import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore function from Redux Toolkit
import authSlice from './authSlice'; // Importing the authSlice reducer

// Configuring the Redux store with combineReducers
const store = configureStore({
    reducer: {
        auth: authSlice, // Adding the authSlice reducer under the 'auth' key
    }
});

// Exporting the configured Redux store
export default store;
