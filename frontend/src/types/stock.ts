import { User } from "./user";

export type plusOrMinus = '+' | '-' | '';

export type CompanyNames = {
    id: number;
    name: string;
}

export type Company = {
    id: number;
    name: string;
    stockPriceDatas: Array<number>;
    StockPriceChangeRate: number;
    nowPrice: number;
}

export type BoughtStockInfo = {
    id: number;
    price: number;
    quantity: number;
    profitOrLossPrice: number;
    created_at: string;
    user: User;
    company: Company;
}

export type MyStockInfo = {
    company: Company;
    boughtStockInfoList: Array<BoughtStockInfo>;
    profitOrLossPrice: number;
    totalQuantity: number;
    totalValue: number;
}

export type PostBoughtStockInfo = {
    price: number;
    quantity: number;
    user_id: number;
    company_id: number;
}

export type PatchBoughtStockInfo = {
    id: number;
    quantity: number;
    tradingQuantity: number;
}

export type DeleteBoughtStockInfo = {
    id: number;
    companyId: number;
    tradingQuantity: number;
}