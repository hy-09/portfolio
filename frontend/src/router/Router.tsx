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
        return <><Redirect to="/login" /><Login /></>
    }
})

export const Router: FC = memo(() => { 
    return (
        <BrowserRouter>
            <Switch>

                <AuthRoute path="/home" render={({ match: { url } }) => (
                    <Switch>
                            {HomeRoutes.map((route) => (
                                <Route 
                                    key={route.path} 
                                    exact={route.exact} 
                                    path={url + route.path}
                                >
                                    <AuthLayout title={route.title}> 
                                        {route.children}
                                    </AuthLayout>
                                </Route>
                            ))}
                    </Switch>
                )} />

                <RedirectRoute path="*" />
                
            </Switch>
        </BrowserRouter>
    )
})