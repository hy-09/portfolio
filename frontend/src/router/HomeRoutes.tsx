import { ChatOutlined, HomeOutlined, TrendingUp } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/home/Home";
import StockDetail from "../components/pages/loggedPages/stocks/StockDetail";
import Stocks from "../components/pages/loggedPages/stocks/Stocks";
import Timeline from "../components/pages/loggedPages/timeline/Timeline";
import { RouteType } from "../types/others";
import { StockRoutes, stockURL } from "./StockRoutes";

export const homeURL = '/home'

export const HomeRoutes: Array<RouteType> = [
    {
        path: '/',
        title: 'ホーム',
        icon: <HomeOutlined />,
        exact: true,
        children: <Home />
    },
    {
        path: stockURL,
        title: '銘柄一覧',
        icon: <TrendingUp />,
        exact: true,
        children: <Stocks />,
        routes: StockRoutes,
    },
    {
        path: stockURL + '/:id',
        exact: true,
        children: <StockDetail />,
        routes: StockRoutes,
    },
    {
        path: '/timeline',
        title: 'タイムライン',
        icon: <ChatOutlined />,
        exact: true,
        children: <Timeline /> 
    },
    {
        path: '*',
        exact: false,
        children: <><Redirect to={homeURL} /><Home /></>
    },
]