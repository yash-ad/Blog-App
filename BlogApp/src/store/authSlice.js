import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    //user is not authenticated
    status:false,
    // No user data
    userData:null
}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{

    }
})



