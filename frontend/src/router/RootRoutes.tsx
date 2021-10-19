import Home from "../components/pages/Home";
import Page404 from "../components/pages/Page404";

export const RootRoutes = [
    {
        path: '/',
        exact: true,
        children: <Home />
    },
    {
        path: '/*',
        exact: false,
        children: <Page404 />
    },
]