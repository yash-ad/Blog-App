import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    //user is not authenticated
    status:false,
    // No user data
    userData:null
}


const authSlice = createSlice({
    //Slice name
    name:'auth',
    //Slice initialState
    initialState,
    //Slice reducers or actions
    reducers:{
        //Individual functions to access from components:-
        //And we know that every reducer has an access of state and action
login:(state,action)=>{
state.status = true;
state.userData = action.payload;
},
logout:(state)=>{
state.status = false;
state.userData = null;
}
    }
})


export const {login,logout} = authSlice.actions;
export default authSlice.reducer;