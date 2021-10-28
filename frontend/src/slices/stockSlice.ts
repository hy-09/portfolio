import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stockPriceDataCount } from '../config';
import { Company, CompanyNames, MyStockInfo } from '../types/stock';

const apiUrl = process.env.REACT_APP_DEV_API_URL

export const fetchAsyncGetCompanies = createAsyncThunk(
    'companies/get',
    async () => {
        const res = await axios.get(`${apiUrl}api/company/`)
        return res.data
    }
)


type InitialState = {
    companies: Array<Company>;
    myStockInfoList: Array<MyStockInfo>;
}

const initialState: InitialState = {
    companies: [
        {
            id: 0,
            name: '',
            stockPriceDatas: [0],
            StockPriceChangeRate: {
                rate: 0,
                plusOrMinus: null
            }
        }
    ],
    myStockInfoList: [
        {
            companyId: 0,
            holdingStocks: [{}],
            profitOrLossPrice: 0,
            totalQuantity: 0,
            totalValue: 0
        }
    ]
};


export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        updateStockPrices(state) {
            state.companies = state.companies.map(company => {
                const oldStockPrice = company.stockPriceDatas.slice(-1)[0]
                const newStockPrice = getNewStockPrice(company)
                let plusOrMinus: '+' | '-' | null
                let rate: number

                if (newStockPrice > oldStockPrice) {
                    plusOrMinus = '+'
                    rate = Math.floor((newStockPrice / oldStockPrice - 1)*10000)/100
                }else if (newStockPrice < oldStockPrice) {
                    plusOrMinus = '-'
                    rate = Math.floor((oldStockPrice / newStockPrice - 1)*10000)/100
                }else {
                    plusOrMinus = null
                    rate = 0
                }

                
                const [, ...data] = company.stockPriceDatas
                return {
                    ...company,
                    stockPriceDatas: [...data, newStockPrice],
                    StockPriceChangeRate: {
                        rate: rate,
                        plusOrMinus: plusOrMinus
                    }
                } 
            })
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
                    return company
                })
                state.companies = companies 
            })
    },
});

function getNewStockPrice(company: Company) {
    const latestStockPrice = company.stockPriceDatas.slice(-1)[0]

    let changeRate;
    if (latestStockPrice > 20000) {
        changeRate = Math.floor((Math.random()*0.08 + (0.97-(latestStockPrice/2000000)))*1000)/1000;
    }else if(latestStockPrice < 3000) {
        changeRate = Math.floor((Math.random()*0.07 + (0.98-(latestStockPrice/300000)))*1000)/1000;
    }else{
        changeRate = Math.floor((Math.random()*0.0817 + 0.96)*1000)/1000;
    }

    return Math.floor(latestStockPrice * changeRate)
}

export const { 
    updateStockPrices
} = stockSlice.actions;

export default stockSlice.reducer;
