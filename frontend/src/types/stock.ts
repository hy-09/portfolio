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
    remaining_quantity: number;
    created_at: string;
    user: number;
    company: number;
}

export type MyStockInfo = {
    companyId: number;
    boughtStockInfoList: Array<BoughtStockInfo>;
    profitOrLossPrice: number;
    totalQuantity: number;
    totalValue: number;
}

export type plusOrMinus = '+' | '-' | '';