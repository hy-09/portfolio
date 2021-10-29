import { Company, plusOrMinus } from "../types/stock"

export const getChangeRate = (before: number, after: number) => {
    let rate: number

    if (after > before) {
        rate = Math.floor((after / before - 1)*10000)/100

    }else if (after < before) {
        rate = -Math.floor((before / after - 1)*10000)/100

    }else {
        rate = 0
    }

    return rate
}


export const getNewStockPrice = (company: Company) => {
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