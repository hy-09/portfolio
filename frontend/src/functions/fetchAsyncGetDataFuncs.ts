import { fetchAsyncGetMyProf, fetchAsyncGetProfs, setLoginUser } from "../slices/authSlice"
import { fetchAsyncGetMyPosts, fetchAsyncGetPosts } from "../slices/postSlice"
import { fetchAsyncGetMyBoughtStockInfoList } from "../slices/stockSlice"

export const fetchAsyncGetDataFuncs = [
    fetchAsyncGetProfs,
    fetchAsyncGetMyProf,
    setLoginUser,
    fetchAsyncGetMyBoughtStockInfoList,
    fetchAsyncGetPosts,
    fetchAsyncGetMyPosts,
]