import { fetchAsyncGetMyProf, fetchAsyncGetProfs, setLoginUser } from "../slices/authSlice"

export const fetchAsyncGetDataFuncs = [
    fetchAsyncGetProfs,
    fetchAsyncGetMyProf,
    setLoginUser,
]