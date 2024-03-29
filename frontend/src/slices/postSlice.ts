import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreatPost, PatchPost, Post } from '../types/post';

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncGetPosts = createAsyncThunk(
    'posts/get',
    async () => {
        const res = await axios.get(`${apiUrl}post/`, {
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
        const res = await axios.get(`${apiUrl}mypost/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncCreatePost = createAsyncThunk(
    'post/post',
    async (data: CreatPost) => {
        const res = await axios.post(`${apiUrl}post/`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncPatchPost = createAsyncThunk(
    'post/patch',
    async (data: PatchPost) => {
        const { id, likeUsers } = data
        const res = await axios.patch(`${apiUrl}post/${id}/`, {likeUsers: likeUsers}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`,
            }
        })
        return res.data
    }
)

export const fetchAsyncDeletePost = createAsyncThunk(
    'post/delete',
    async (id: number) => {
        const res = await axios.delete(`${apiUrl}post/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`,
            }
        })
        return id
    }
)

type InitialState = {
    isLikeProcessing: boolean;
    posts: Array<Post>;
    myPosts: Array<Post>;
}

const initialState: InitialState = {
    isLikeProcessing: false,
    posts: [],
    myPosts: [],
};


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        startLikeProcess(state) {
            state.isLikeProcessing = true
        },
        endLikeProcess(state) {
            state.isLikeProcessing = false
        },
        resetPostState(state) {
            state.isLikeProcessing = initialState.isLikeProcessing
            state.posts = initialState.posts
            state.myPosts = initialState.myPosts
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
                state.posts = action.payload.reverse()
            })

            .addCase(fetchAsyncGetMyPosts.fulfilled, (state, action) => {
                state.myPosts = action.payload.reverse()
            })

            .addCase(fetchAsyncCreatePost.fulfilled, (state, action) => {
                state.posts = [
                    action.payload,
                    ...state.posts
                ]
                state.myPosts = [
                    action.payload,
                    ...state.myPosts
                ]
            })

            .addCase(fetchAsyncPatchPost.fulfilled, (state, action) => {
                state.posts = state.posts.map(post => 
                    post.id === action.payload.id ? action.payload : post
                )
                state.myPosts = state.myPosts.map(post => 
                    post.id === action.payload.id ? action.payload : post
                )
            })

            .addCase(fetchAsyncDeletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => 
                    post.id !== action.payload
                )
                state.myPosts = state.myPosts.filter(post => 
                    post.id !== action.payload
                )
            })
    },
});

export const { 
    startLikeProcess,
    endLikeProcess,
    resetPostState,
} = postSlice.actions;

export default postSlice.reducer;
