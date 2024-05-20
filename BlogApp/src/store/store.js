// Import necessary function from Redux Toolkit for creating the store
import { configureStore,combineReducers } from '@reduxjs/toolkit';

// Import the authReducer from authSlice:-
import authReducer from './authSlice';

//Import the postReducer from postSlice:-
import postReducer from './postSlice'

//combineReducers for more than one reducer:-
const rootReducer = combineReducers({
    auth: authReducer,
    posts: postReducer,
  });

  //Configure the Redux store
  const store = configureStore({
    reducer: rootReducer,
  });


// Export the configured Redux store
export default store;
