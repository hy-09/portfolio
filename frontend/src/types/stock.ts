export type CompanyNames = {
    id: number;
    name: string;
}

export type Company = {
    id: number;
    name: string;
    stockPriceDatas: Array<number>;
    StockPriceChangeRate: {
        rate: number;
        plusOrMinus: string;
    };
}

export type MyStockInfo = {
    companyId: number;
    holdingStocks: Array<Object>;
    profitOrLossPrice: number;
    totalQuantity: number;
    totalValue: number;
}
