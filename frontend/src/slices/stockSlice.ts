import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stockPriceDataCount } from '../config';
import { getChangeRate, getNewStockPrice } from '../functions/calculations';
import { BoughtStockInfo, Company, CompanyNames, MyStockInfo, TradeStockForm } from '../types/stock';

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


type InitialState = {
    companies: Array<Company>;
    myStockInfoList: Array<MyStockInfo>;
    tradeStockForm: TradeStockForm;
}

const initialState: InitialState = {
    companies: [],
    myStockInfoList: [],
    tradeStockForm: {
        quantity: 100,
        company: {
            id: 0,
            name: '',
            stockPriceDatas: [],
            StockPriceChangeRate: 0,
            nowPrice: 0,
        }
    }
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

                    let totalOldValue = 0
                    myStockInfo.boughtStockInfoList.forEach(boughtStockInfo => {
                        totalOldValue += boughtStockInfo.price * boughtStockInfo.quantity
                        boughtStockInfo.profitOrLossPrice = (company.nowPrice - boughtStockInfo.price) * boughtStockInfo.quantity
                    })
                    const totalNewValue = company.nowPrice * myStockInfo.totalQuantity
                    
                    return {
                        ...myStockInfo,
                        company: company,
                        profitOrLossPrice: totalNewValue - totalOldValue,
                        totalValue: totalNewValue
                    }
                })
            }
        },
        setTradeStockForm(state, action) {
            state.tradeStockForm = {
                ...state.tradeStockForm,
                company: action.payload,
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

                        let totalOldValue = 0
                        boughtStockInfoList.forEach((boughtStockInfo: BoughtStockInfo) => {
                            totalOldValue += boughtStockInfo.price * boughtStockInfo.quantity
                            boughtStockInfo.profitOrLossPrice = (company.nowPrice - boughtStockInfo.price) * boughtStockInfo.quantity
                        })

                        const totalNewValue = company.nowPrice * totalQuantity
                        
                        myStockInfoList = [
                            ...myStockInfoList,
                            {
                                ...initialState.myStockInfoList[0],
                                company: company,
                                boughtStockInfoList: boughtStockInfoList,
                                totalQuantity: totalQuantity,
                                totalValue: totalNewValue,
                                profitOrLossPrice: totalNewValue - totalOldValue,
                            }
                        ] 
                    }
                })
                state.myStockInfoList = myStockInfoList
            })
    },
});

export const { 
    updateStockPrices,
    setTradeStockForm,
    resetStockState,
} = stockSlice.actions;

export default stockSlice.reducer;
