import { Box, Button, CssBaseline, Grid, makeStyles, Theme } from "@material-ui/core";
import { FC, memo, ReactNode, useState } from "react";
import Sidebar from "../organisms/layout/Sidebar";
import Header from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))


const AuthLayout: FC<Props> = memo((props) => {
    const { children } = props
    const classes = useStyles()
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar 
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
})
export default AuthLayout