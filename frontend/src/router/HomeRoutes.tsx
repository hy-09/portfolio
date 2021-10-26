import Home from "../components/pages/loggedPages/Home";

export const HomeRoutes = [
    {
        path: '/',
        exact: true,
        children: <Home />
    },
    {
        path: '/*',
        exact: false,
        children: <Home />
    },
]