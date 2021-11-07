import { FC, memo } from "react";
import { Route, Switch, Redirect, RouteProps, BrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import AuthLayout from "../components/templates/AuthLayout";
import { getRoute } from "../functions/router";
import { RouteType } from "../types/others";
import { AuthRoutes, homeURL } from "./AuthRoutes";

const AuthRoute: FC<RouteProps> = memo(({...props}) => {
    if (!!localStorage.localJWT) {
        return <Route {...props} />
    } else {
        return <><Redirect to="/login" /><Login /></>
    }
})

const RedirectRoute: FC<RouteProps> = memo(() => {
    if (!!localStorage.localJWT) {
        return <Redirect to={homeURL} />
    } else {
        return <><Redirect to="/login" /><Login /></>
    }
})

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
                        <AuthLayout> 
                            {route.children}
                        </AuthLayout>
                    </AuthRoute>
                ))}

                <RedirectRoute path="*" />
                
            </Switch>
        </BrowserRouter>
    )
})