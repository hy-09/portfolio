import { fetchAsyncGetMyProf, fetchAsyncGetProfs, setLoginUser } from "../slices/authSlice"
import { fetchAsyncGetMyBoughtStockInfoList } from "../slices/stockSlice"

export const fetchAsyncGetDataFuncs = [
    fetchAsyncGetProfs,
    fetchAsyncGetMyProf,
    setLoginUser,
    fetchAsyncGetMyBoughtStockInfoList,
]