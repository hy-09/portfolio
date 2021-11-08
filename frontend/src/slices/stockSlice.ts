import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stockPriceDataCount } from '../config';
import { getChangeRate, getCalcAns, getNewStockPrice } from '../functions/calculations';
import { BoughtStockInfo, Company, CompanyNames, DeleteBoughtStockInfo, MyStockInfo, PatchBoughtStockInfo, PostBoughtStockInfo } from '../types/stock';

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncGetCompanies = createAsyncThunk(
    'companies/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/company/`)
        return res.data
    }
)

export const fetchAsyncGetMyBoughtStockInfoList = createAsyncThunk(
    'stocks/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/myboughtstockinfo/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)

export const fetchAsyncCreateBoughtStockInfo = createAsyncThunk(
    'stock/post',
    async (data: PostBoughtStockInfo) => {
        const res = await axios.post(`${apiUrl}api/boughtstockinfo/`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return res.data
    }
)


export const fetchAsyncPatchBoughtStockInfo = createAsyncThunk(
    'stock/patch',
    async (data: PatchBoughtStockInfo) => {
        const { id, quantity, tradingQuantity } = data
        const res = await axios.patch(`${apiUrl}api/boughtstockinfo/${id}/`, { quantity: quantity}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        res.data.tradingQuantity = tradingQuantity
        return res.data
    }
)

export const fetchAsyncDeleteBoughtStockInfo = createAsyncThunk(
    'stock/delete',
    async (data: DeleteBoughtStockInfo) => {
        const { id, tradingQuantity } = data
        const res = await axios.delete(`${apiUrl}api/boughtstockinfo/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.localJWT}`
            }
        })
        return data
    }
)


type InitialState = {
    companies: Array<Company>;
    myStockInfoList: Array<MyStockInfo>;
}

const initialState: InitialState = {
    companies: [],
    myStockInfoList: [],
};


export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        updateStockPrices(state) {
            state.companies = state.companies.map(company => {
                const oldStockPrice = company.stockPriceDatas.slice(-1)[0]
                const newStockPrice = getNewStockPrice(company)
                const StockPriceChangeRate = getChangeRate(oldStockPrice, newStockPrice)
                
                const [, ...data] = company.stockPriceDatas
                return {
                    ...company,
                    stockPriceDatas: [...data, newStockPrice],
                    StockPriceChangeRate: StockPriceChangeRate,
                    nowPrice: newStockPrice
                } 
            })

            if (state.myStockInfoList.length > 0) {
                state.myStockInfoList = state.myStockInfoList.map(myStockInfo => {
                    const company = state.companies.find(c => c.id === myStockInfo.company.id)!

                    const { profitOrLossPrice, totalValue } = getCalcAns(company.nowPrice, myStockInfo.totalQuantity, myStockInfo.boughtStockInfoList)

                    return {
                        ...myStockInfo,
                        company: company,
                        profitOrLossPrice: profitOrLossPrice,
                        totalValue: totalValue
                    }
                })
            }
        },
        resetStockState(state) {
            state.myStockInfoList = initialState.myStockInfoList
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncGetCompanies.fulfilled, (state, action) => {
                const companyNames: Array<CompanyNames> = action.payload
                
                const companies = companyNames.map(companyName => {
                    const firstStockPrice: number = Math.floor(Math.random()*11000 + 1000)
                    const company = {
                        ...initialState.companies[0],
                        id: companyName.id,
                        name: companyName.name,
                        stockPriceDatas: [firstStockPrice]
                    };
                    
                    [...Array(stockPriceDataCount-1)].forEach(() => {
                        const newStockPrice = getNewStockPrice(company)
            
                        company.stockPriceDatas = [
                            ...company.stockPriceDatas,
                            newStockPrice
                        ]
                    })
                    company.nowPrice = company.stockPriceDatas.slice(-1)[0]
                    return company
                })
                state.companies = companies 
            })

            .addCase(fetchAsyncGetMyBoughtStockInfoList.fulfilled, (state, action) => {
                if (action.payload.length === 0) return

                let myStockInfoList: Array<MyStockInfo> = []
                
                state.companies.forEach(company => {
                    const boughtStockInfoList = action.payload.filter((boughtStockInfo: BoughtStockInfo) => boughtStockInfo.company.id === company.id)

                    if (boughtStockInfoList.length > 0) {
                        const totalQuantity = boughtStockInfoList.reduce((sum: number, boughtStockInfo: BoughtStockInfo) => {
                            return sum + boughtStockInfo.quantity
                        }, 0)

                        const { profitOrLossPrice, totalValue } = getCalcAns(company.nowPrice, totalQuantity, boughtStockInfoList)
                        
                        myStockInfoList = [
                            ...myStockInfoList,
                            {
                                ...initialState.myStockInfoList[0],
                                company: company,
                                boughtStockInfoList: boughtStockInfoList,
                                totalQuantity: totalQuantity,
                                totalValue: totalValue,
                                profitOrLossPrice: profitOrLossPrice,
                            }
                        ] 
                    }
                })
                state.myStockInfoList = myStockInfoList
            })

            .addCase(fetchAsyncCreateBoughtStockInfo.fulfilled, (state, action) => {
                const companyId = action.payload.company.id
                
                if (!state.myStockInfoList.find(i => i.company.id === companyId)) {
                    state.myStockInfoList = [
                        ...state.myStockInfoList,
                        {
                            company: state.companies.find(company => company.id === companyId)!,
                            boughtStockInfoList: [{
                                ...action.payload,
                                profitOrLossPrice: 0
                            }],
                            totalQuantity: action.payload.quantity,
                            totalValue: action.payload.quantity * action.payload.price,
                            profitOrLossPrice: 0
                        }
                    ]
                    return
                }

                state.myStockInfoList = state.myStockInfoList.map(myStockInfo => {
                    if (myStockInfo.company.id === companyId) {
                        return {
                             ...myStockInfo,
                             boughtStockInfoList: [...myStockInfo.boughtStockInfoList, {
                                 ...action.payload,
                                 profitOrLossPrice: 0,
                             }],
                             totalQuantity: myStockInfo.totalQuantity + action.payload.quantity,
                             profitOrLossPrice: 0,
                        }
                    } else {
                        return myStockInfo
                    }
                })
            })

            .addCase(fetchAsyncPatchBoughtStockInfo.fulfilled, (state, action) => {
                state.myStockInfoList = state.myStockInfoList.map(myStockInfo => {
                    if (myStockInfo.company.id === action.payload.company.id) {
                        return {
                            ...myStockInfo,
                            totalQuantity: myStockInfo.totalQuantity - action.payload.tradingQuantity,
                            boughtStockInfoList: myStockInfo.boughtStockInfoList.map(boughtStockInfo => {
                                return {
                                    ...boughtStockInfo,
                                    quantity: boughtStockInfo.id === action.payload.id ? action.payload.quantity : boughtStockInfo.quantity
                                }
                            })
                        }
                        
                    } else {
                        return myStockInfo
                    }
                })
            })

            .addCase(fetchAsyncDeleteBoughtStockInfo.fulfilled, (state, action) => {
                const targetStockInfo = state.myStockInfoList.find(i => i.company.id === action.payload.companyId)!

                if (targetStockInfo.totalQuantity === action.payload.tradingQuantity) {
                    state.myStockInfoList = state.myStockInfoList.filter(i => i.company.id !== action.payload.companyId)
                    return
                }
                
                state.myStockInfoList = state.myStockInfoList.map(myStockInfo => {
                    if (myStockInfo.company.id === action.payload.companyId) {

                        return {
                            ...myStockInfo,
                            totalQuantity: myStockInfo.totalQuantity - action.payload.tradingQuantity,
                            boughtStockInfoList: myStockInfo.boughtStockInfoList.filter(boughtStockInfo => {
                                return boughtStockInfo.id !== action.payload.id
                            })
                        }
                        
                    } else {
                        return myStockInfo
                    }
                })
            })
    },
});

export const { 
    updateStockPrices,
    resetStockState,
} = stockSlice.actions;

export default stockSlice.reducer;
