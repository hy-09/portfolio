import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EditProfile, Name, Auth, User, Profile, UpdateFund } from '../types/user'

const rootUrl = process.env.REACT_APP_DEV_ROOT_URL
const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncLogin = createAsyncThunk(
    'auth/login',
    async (auth: Auth) => {
        const res = await axios.post(`${rootUrl}authen/jwt/create`, auth, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data
    }
)

export const fetchAsyncRegister = createAsyncThunk(
    'auth/register',
    async (auth: Auth) => {
        const res = await axios.post(`${apiUrl}register/`, auth, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data
    }
)

export const fetchAsyncCreateProf = createAsyncThunk(
    'profile/post',
    async (name: Name) => {
        await axios.post(`${apiUrl}profile/`, name, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
    }
)

export const fetchAsyncUpdateProf = createAsyncThunk(
    'profile/put',
    async (profile: EditProfile) => {
        const uploadData = new FormData()
        uploadData.append('name', profile.name)
        profile.img && uploadData.append('img', profile.img, profile.img.name)

        const res = await axios.put(`${apiUrl}profile/${profile.id}/`, uploadData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncGetUsers = createAsyncThunk(
    'users/get',
    async () => {
        const res = await axios.get(`${apiUrl}user/`)
        return res.data
    }
)

export const fetchAsyncPatchUser = createAsyncThunk(
    'user/patch',
    async (updateFund: UpdateFund) => {
        const { user_id, fund } = updateFund
        const data = { fund: fund}

        const res = await axios.patch<User>(`${apiUrl}user/${user_id}/`, data, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncGetMyProf = createAsyncThunk(
    'profile/get',
    async () => {
        const res = await axios.get(`${apiUrl}myprofile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data[0]
    }
)

export const fetchAsyncGetProfs = createAsyncThunk(
    'profiles/get',
    async () => {
        const res = await axios.get(`${apiUrl}profile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

type InitialState = {
    firstTimeAfterRegister: boolean;
    loginUser: User;
    users: Array<User>;
    myprofile: Profile;
    profiles: Array<Profile>;
}

const initialState: InitialState = {
    firstTimeAfterRegister: false,
    loginUser: {
        id: 0,
        email: '',
        fund: 0,
    },
    users: [],
    myprofile: {
        id: 0,
        name: '',
        user: {
            id: 0,
            email: '',
            fund: 0,
        },
        created_at: '',
        img: undefined,
    },
    profiles: []
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFirstTimeAfterRegister(state, action) {
            state.firstTimeAfterRegister = action.payload
        },
        setLoginUser(state) {
            state.loginUser = state.users.find(user => user.id === state.myprofile.user.id )!
        },
        resetAuthState(state) {
            state.firstTimeAfterRegister = false
            state.loginUser = initialState.loginUser
            state.myprofile = initialState.myprofile
            state.profiles = initialState.profiles
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncLogin.fulfilled, (state, action) => {
                localStorage.setItem('localJWT', action.payload.access)
            })
            .addCase(fetchAsyncRegister.fulfilled, (state, action) => {
                state.loginUser = action.payload
                state.users = [
                    ...state.users,
                    action.payload
                ]
            })
            .addCase(fetchAsyncGetUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
                const profile: Profile = action.payload
                const loginUser = state.users.find(user => user.id === profile.user.id)
                state.myprofile = {
                    ...profile,
                    img: loginUser!.email.startsWith('vl2id0aow1qkrt') && profile.img === null ? `https://picsum.photos/${100+loginUser!.id}` :
                        profile.img === null ? undefined :
                        profile.img           
                }
            })
            .addCase(fetchAsyncPatchUser.fulfilled, (state, action) => {
                state.loginUser = action.payload
                state.users = state.users.map(user => 
                    user.id === action.payload.id ? action.payload : user
                )
            })
            .addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
                const profiles: Array<Profile> = action.payload
                state.profiles = profiles.map(profile => {
                    const user = state.users.find(user => user.id === profile.user.id)
                    return {
                        ...profile,
                        img: user!.email.startsWith('vl2id0aow1qkrt') && profile.img == null ? `https://picsum.photos/${100+user!.id}` :
                            profile.img === null ? undefined :
                            profile.img
                    }
                })
            })
            .addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
                const myprofile = action.payload
                state.myprofile = myprofile
                state.profiles = state.profiles.map((profile) => 
                    profile.id === myprofile.id ? myprofile : profile
                )
            })
    },
});

export const { 
    setFirstTimeAfterRegister,
    setLoginUser,
    resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
