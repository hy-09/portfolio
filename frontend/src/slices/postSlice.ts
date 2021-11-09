import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../types/post';

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncGetPosts = createAsyncThunk(
    'posts/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/post/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncGetMyPosts = createAsyncThunk(
    'myposts/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/mypost/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)


type InitialState = {
    posts: Array<Post>;
    myPosts: Array<Post>;
}

const initialState: InitialState = {
    posts: [],
    myPosts: [],
};


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetPostState(state) {
            state.posts = initialState.posts
            state.myPosts = initialState.myPosts
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
                state.posts = action.payload
            })

            .addCase(fetchAsyncGetMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload
            })
    },
});

export const { 
    resetPostState,
} = postSlice.actions;

export default postSlice.reducer;
