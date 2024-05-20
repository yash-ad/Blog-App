// Import createSlice function from Redux Toolkit:-
import { createSlice } from "@reduxjs/toolkit"

//Define initialState for post slice:-
const initialState = {
posts:[],
loading:false,
error:null
};


const postSlice = {
    name:'posts',
    initialState,
    reducers:{
        fetchPostsStart(state){
            state.loading = true,
            state.error  = null;
        },
        fetchPostsSuccess(state,action){
state.loading = false,
state.posts = action.payload;
        },
        fetchPostsFailure(state,action){
state.loading = false,
state.error = action.payload;
        },
        addPost(state,action){
state.posts.push(action.payload);
        },
        deletePost(state,action){
state.posts = state.posts.filter((post)=>post.$id !== action.payload
)
 },
 updatePost(state,action){
const index = state.posts.findIndex((post)=> post.$id === action.payload.$id)
 if(index !== -1){
    state.posts[index] = action.payload
 }

},




    }
}