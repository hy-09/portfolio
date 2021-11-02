import { ChatOutlined, HomeOutlined, TrendingUp } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/Home";
import Stocks from "../components/pages/loggedPages/Stocks";
import Timeline from "../components/pages/loggedPages/Timeline";

export const HomeRoutes = [
    {
        path: '/',
        title: 'ホーム',
        icon: <HomeOutlined />,
        exact: true,
        children: <Home />
    },
    {
        path: '/stocks',
        title: '銘柄一覧',
        icon: <TrendingUp />,
        exact: true,
        children: <Stocks />
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
        children: <><Redirect to="/" /><Home /></>
    },
]