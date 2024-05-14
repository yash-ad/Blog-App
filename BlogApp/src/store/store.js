import {configureStore} from '@reduxjs/toolkit'
import {authSlice as authReducer} from './authSlice';



export const store = configureStore({
    reducer:{
auth : authReducer,
}
});