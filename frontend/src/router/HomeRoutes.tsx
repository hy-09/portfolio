import { Redirect } from "react-router-dom";
import Home from "../components/pages/loggedPages/Home";
import Stocks from "../components/pages/loggedPages/Stocks";
import Timeline from "../components/pages/loggedPages/Timeline";

export const HomeRoutes = [
    {
        path: '/',
        exact: true,
        children: <Home />
    },
    {
        path: '/stocks',
        exact: true,
        children: <Stocks />
    },
    {
        path: '/timeline',
        exact: true,
        children: <Timeline />
    },
    {
        path: '*',
        exact: false,
        children: <><Redirect to="/" /><Home /></>
    },
]