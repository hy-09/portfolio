import { FC, memo } from "react";
import { Route, Switch, Redirect, RouteProps, BrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import AuthLayout from "../components/templates/AuthLayout";
import { RouteType } from "../types/others";
import { HomeRoutes, homeURL } from "./HomeRoutes";
import { StockRoutes, stockURL } from "./StockRoutes";

const AuthRoute: FC<RouteProps> = memo(({...props}) => {
    if (!!localStorage.localJWT) {
        return <Route {...props} />
    } else {
        return <Redirect to="/login" />
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

// const AuthPage: FC<Props> = (props) => {
//     const { route, parentURL } = props

//     return (
//         <>
//         {route.routes ? (

//             <>
// {console.log(route.routes)}
//                 <Route path={parentURL + route.path} render={({ match: { url } }) => (
//                     <Switch>
//                         {route.routes!.map(childRoute => (
//                             <Route
//                                 key={childRoute.path}
//                                 exact={childRoute.exact}
//                                 path={url + childRoute.path}
//                             >
//                                 <AuthPage route={childRoute} parentURL={url + childRoute.path} />
//                             </Route>
//                         ))}
//                     </Switch>
//                 )} />
//             </>
//         ) : (
//             <AuthLayout title={route.title}> 
//             {console.log(route.title)}
//                 {route.children}
//             </AuthLayout>
//         )}
//         </>
//     )
// }

export const Router: FC = memo(() => { 
    return (
        <BrowserRouter>
            <Switch>

                <AuthRoute path={homeURL} render={() => (
                    <Switch>
                        {HomeRoutes.map((route) => (
                            <Route 
                                key={route.path} 
                                exact={route.exact} 
                                path={homeURL + route.path}
                            >
                                {/* <AuthPage route={route} parentURL={url + route.path} /> */}
                                <AuthLayout> 
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