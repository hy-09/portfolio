import { Grid } from "@material-ui/core";
import { FC, memo, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import Header from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
}

const AuthLayout: FC<Props> = memo((props) => {
    const { children } = props
    
    return (
        <>
            {localStorage.localJWT ? (
            <>
                <Header />
                <Grid
                    container
                >
                    {children}
                </Grid>
            </>
            ) : (
                <Redirect to={'/login'} />
            )}
        </>
    )
})
export default AuthLayout