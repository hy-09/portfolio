import { Box, Button, Container, CssBaseline, Grid, makeStyles, Theme } from "@material-ui/core";
import { FC, memo, ReactNode, useEffect, useState } from "react";
import Sidebar from "../organisms/layout/Sidebar";
import Header from "../organisms/layout/Header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleModalOpen, handleNotifyOpen } from "../../slices/othersSlice";
import ProfileForm from "../molecules/ProfileForm";

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
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(0, 2, 2, 0),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(0, 3, 3, 0),
        },
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(0, 6, 3, 3),
        }
    },
}))


const AuthLayout: FC<Props> = memo((props) => {
    const { children } = props
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const firstTimeAfterRegister = useAppSelector<boolean>(state => state.auth.firstTimeAfterRegister)
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (firstTimeAfterRegister) {
            dispatch(handleModalOpen({
                title: 'プロフィール編集', 
                content: <ProfileForm />
            }))
            dispatch(handleNotifyOpen({
                message: 'まずはプロフィールを編集しましょう！',
                type: 'success'
            }))
        }
    }, [])
    
    return (
        <div className={classes.root}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar 
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    {children}
                </Grid>
            </main>
        </div>
    )
})
export default AuthLayout