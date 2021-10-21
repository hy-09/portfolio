import { FC, memo } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
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

export const Router: FC = memo(() => {
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
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
            <Route path="*">
                {!!localStorage.localJWT ? (
                    <Redirect to={'/home'} />
                ) : (
                    <Redirect to={'/login'} />
                )}
            </Route>
        </Switch>
    )
})