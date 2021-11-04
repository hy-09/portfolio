import { ChatOutlined, HomeOutlined, TrendingUp } from "@material-ui/icons";
import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/home/Home";
import Stocks from "../components/pages/loggedPages/stocks/Stocks";
import Timeline from "../components/pages/loggedPages/timeline/Timeline";
import { RouteType } from "../types/others";

export const timelineURL = '/timeline'

export const TimelineRoute: Array<RouteType> = [
    {
        path: '/:id',
        exact: true,
        children: <Home />
    },
    {
        path: '/:id/*',
        exact: false,
        children: <><Redirect to="/" /><Home /></>
    },
]