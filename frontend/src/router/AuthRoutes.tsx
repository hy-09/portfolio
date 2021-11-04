import { ChatOutlined, HomeOutlined, TrendingUp } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/home/Home";
import StockDetail from "../components/pages/loggedPages/stocks/StockDetail";
import Stocks from "../components/pages/loggedPages/stocks/Stocks";
import Timeline from "../components/pages/loggedPages/timeline/Timeline";
import { RouteType } from "../types/others";

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
        path: `${stockURL}/:id/*`,
        exact: false,
        children: <><Redirect to="/" /><Home /></>
    },
    {
        name: 'timeline',
        path: timelineURL,
        exact: true,
        children: <Timeline /> 
    },
    {
        path: '*',
        exact: false,
        children: <><Redirect to={homeURL} /><Home /></>
    },
]