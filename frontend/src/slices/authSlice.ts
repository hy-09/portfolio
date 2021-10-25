import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EditProfile, Name, Auth, User, Profile } from '../types/user'

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncLogin = createAsyncThunk(
    'auth/post',
    async (authen: Auth) => {
        const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
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
        const res = await axios.post(`${apiUrl}api/register/`, auth, {
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
        const res = await axios.post(`${apiUrl}api/profile/`, name, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncUpdateProf = createAsyncThunk(
    'profile/put',
    async (profile: EditProfile) => {
        const uploadData = new FormData()
        uploadData.append('name', profile.name)
        profile.img && uploadData.append('img', profile.img, profile.img.name)

        const res = await axios.put(`${apiUrl}api/profile/${profile.id}/`, uploadData, {
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
        const res = await axios.get(`${apiUrl}api/user/`)
        return res.data
    }
)

export const fetchAsyncGetMyProf = createAsyncThunk(
    'profile/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/myprofile/`, {
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
        const res = await axios.get(`${apiUrl}api/profile/`, {
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
        profile: 0
    },
    users: [
        {
            id: 0,
            email: '',
            fund: 0,
            profile: 0,
        }
    ],
    myprofile: {
        id: 0,
        name: '',
        user: 0,
        created_at: '',
        img: '',
    },
    profiles: [
        {
            id: 0,
            name: '',
            user: 0,
            created_at: '',
            img: '',
        }
    ]
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFirstTimeAfterRegister(state) {
            state.firstTimeAfterRegister = true
        },
        setLoginUser(state) {
            state.loginUser = state.users.find(user => user.id === state.myprofile.user )!
        }
    },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncLogin.fulfilled, (state, action) => {
                localStorage.setItem('localJWT', action.payload.access)
            })
            .addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
                state.myprofile = action.payload
            })
            .addCase(fetchAsyncGetUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
                const profile = action.payload
                state.myprofile = profile
                const loginUser = state.users.find(user => user.id === state.myprofile.user )!
                state.myprofile = {
                    ...profile,
                    img: loginUser!.email.startsWith('dammy') && profile.img == null ? `https://picsum.photos/${100+loginUser!.id}` : profile.img            
                }
            })
            .addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
                const profiles: Array<Profile> = action.payload
                state.profiles = profiles
                state.profiles = profiles.map(profile => {
                    const user = state.users.find(user => user.id === profile.user)
                    return {
                        ...profile,
                        img: user!.email.startsWith('dammy') && profile.img == null ? `https://picsum.photos/${100+user!.id}` : profile.img
                    }
                })
            })
            .addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
                state.myprofile = action.payload
                state.profiles = state.profiles.map((prof) => 
                    prof.id === action.payload.id ? action.payload : prof
                )
            })
    },
});

export const { 
    setFirstTimeAfterRegister,
    setLoginUser,
} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default authSlice.reducer;
