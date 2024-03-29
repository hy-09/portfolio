import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/home/Home";
import StockTradeForm from "../components/pages/loggedPages/stocks/StockTradeForm";
import StockDetail from "../components/pages/loggedPages/stocks/StockDetail";
import Stocks from "../components/pages/loggedPages/stocks/Stocks";
import Timeline from "../components/pages/loggedPages/timeline/Timeline";
import { RouteType } from "../types/others";
import UserTimeline from "../components/pages/loggedPages/timeline/UserTimeline";

export const homeURL = '/home'
export const stockURL = `${homeURL}/stocks`
export const timelineURL = `${homeURL}/timeline`

export const AuthRoutes: Array<RouteType> = [
    {
        name: 'home',
        path: homeURL,
        exact: true,
        children: <Home />
    },
    {
        name: 'stocks',
        path: stockURL,
        exact: true,
        children: <Stocks />,
    },
    {
        name: 'stockDetail',
        path: `${stockURL}/:id`,
        exact: true,
        children: <StockDetail />
    },
    {
        name: 'buyStockForm',
        path: `${stockURL}/:id/buy/form`,
        exact: true,
        children: <StockTradeForm />
    },
    {
        name: 'sellStockForm',
        path: `${stockURL}/:id/sell/form`,
        exact: true,
        children: <StockTradeForm />
    },
    {
        path: `${stockURL}/:id/*`,
        exact: false,
        children: <><Redirect to="/" /><Stocks /></>
    },
    {
        name: 'timeline',
        path: timelineURL,
        exact: true,
        children: <Timeline /> 
    },
    {
        name: 'userTimeline',
        path: `${homeURL}/user/:id/timeline`,
        exact: true,
        children: <UserTimeline /> 
    },
    {
        path: '*',
        exact: false,
        children: <><Redirect to={homeURL} /><Home /></>
    },
]