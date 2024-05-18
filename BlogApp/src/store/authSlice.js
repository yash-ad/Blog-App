// Import createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the auth slice
const initialState = {
    status: false, // Indicates whether a user is logged in or not
    userData: null // Stores user data when logged in
};

// Create an auth slice using createSlice
const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        // Reducer function to handle user login
        login: (state, action) => {
            state.status = true; // Set status to true indicating user is logged in
            state.userData = action.payload.userData; // Set user data received from action payload
        },
        // Reducer function to handle user logout
        logout: (state) => {
            state.status = false; // Set status to false indicating user is logged out
            state.userData = null; // Clear user data
        }
    }
});

// Extract action creators from the auth slice
export const { login, logout } = authSlice.actions;

// Export the reducer function generated by createSlice
export default authSlice.reducer;
