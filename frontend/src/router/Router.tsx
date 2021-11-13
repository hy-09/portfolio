import { FC, memo } from "react";
import { Route, Switch, Redirect, RouteProps, BrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import AuthLayout from "../components/templates/AuthLayout";
import ScrollToTop from "../providers/ScrollToTop";
import { RouteType } from "../types/others";
import { AuthRoutes, homeURL } from "./AuthRoutes";

const AuthRoute: FC<RouteProps> = ({...props}) => {
    if (!!localStorage.localJWT) {
        return <Route {...props} />
    } else {
        return <><Redirect to="/login" /><Login /></>
    }
}

const RedirectRoute: FC<RouteProps> = () => {
    if (!!localStorage.localJWT) {
        return <Redirect to={homeURL} />
    } else {
        return <><Redirect to="/login" /><Login /></>
    }
}

type Props = {
    route: RouteType;
    parentURL: string;
}

export const Router: FC = memo(() => { 
    return (
        <BrowserRouter>
            <Switch>
                {AuthRoutes.map((route) => (
                    <AuthRoute 
                        key={route.path} 
                        exact={route.exact} 
                        path={route.path}
                    >
                        <ScrollToTop>
                            <AuthLayout> 
                                {route.children}
                            </AuthLayout>
                        </ScrollToTop>
                    </AuthRoute>
                ))}

                <RedirectRoute path="*" />
                
            </Switch>
        </BrowserRouter>
    )
})