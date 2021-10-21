import { FC, memo } from "react";
import { Route, Switch, Redirect, RouteProps, BrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import AuthLayout from "../components/templates/AuthLayout";
import { HomeRoutes } from "./HomeRoutes";

const AuthRoute: FC<RouteProps> = memo(({...props}) => {
    if (!!localStorage.localJWT) {
        return <Route {...props} />
    } else {
        return <Redirect to="/login" />
    }
})

const RedirectRoute: FC<RouteProps> = memo(() => {
    if (!!localStorage.localJWT) {
        return <Redirect to="/home" />
    } else {
        return <Login />
    }
})

export const Router: FC = memo(() => {
    return (
        <BrowserRouter>
            <Switch>
                <RedirectRoute path="/login" exact />

                <Route path="/login/*">
                    <Redirect to="/login" />
                </Route>

                <AuthRoute path="/home" render={({ match: { url } }) => (
                    <Switch>
                        <AuthLayout>
                            {HomeRoutes.map((route) => (
                                <Route 
                                    key={route.path} 
                                    exact={route.exact} 
                                    path={url + route.path}
                                >
                                    {route.children}
                                </Route>
                            ))}
                        </AuthLayout>
                    </Switch>
                )} />

                <RedirectRoute path="*" />
                
            </Switch>
        </BrowserRouter>
    )
})