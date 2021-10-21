import { FC, memo } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/pages/Login";
import AuthLayout from "../components/templates/AuthLayout";
import { HomeRoutes } from "./HomeRoutes";

export const Router: FC = memo(() => {
    return (
        <Switch>
            <Route exact path="/login">
                {!!localStorage.localJWT ? (
                    <Redirect to={'/home'} />
                ) : (
                    <Login />
                )}
            </Route>
            <Route path="/home" render={({ match: { url } }) => (
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