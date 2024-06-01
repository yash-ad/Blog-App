import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore function from Redux Toolkit
import authSlice from './authSlice'; // Importing the authSlice reducer

// Configuring the Redux store with combineReducers
//The configureStore function is called to create the Redux store.
const store = configureStore({
    //The reducer option is an object where each key is a slice of state, and each value is the corresponding reducer function.
    reducer: {
        auth: authSlice, // Adding the authSlice reducer under the 'auth' key
    }
});

// Exporting the configured Redux store
export default store;
