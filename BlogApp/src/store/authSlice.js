import { createSlice } from '@reduxjs/toolkit';

// Initial state of the auth slice
const initialState = {
    status: false, // User authentication status
    userData: null // User data
};

// Create the authSlice using createSlice
const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState, // Initial state
    reducers: {
        // Reducer to handle user login
        login: (state, action) => {
            state.status = true; // Update authentication status to true
            state.userData = action.payload; // Update user data
        },
        // Reducer to handle user logout
        logout: (state) => {
            state.status = false; // Update authentication status to false
            state.userData = null; // Clear user data
        }
    }
});

// Export actions from authSlice
export const { login, logout } = authSlice.actions;

// Export the reducer function
export default authSlice.reducer;
