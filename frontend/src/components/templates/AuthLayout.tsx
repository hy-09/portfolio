import { Box, Button, Container, CssBaseline, Divider, Grid, IconButton, makeStyles, Theme, Typography, useTheme } from "@material-ui/core";
import { FC, memo, ReactNode, useEffect, useState } from "react";
import Sidebar from "../organisms/layout/Sidebar";
import Header from "../organisms/layout/Header";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenModal, handleOpenNotify } from "../../slices/othersSlice";
import ProfileForm from "../molecules/ProfileForm";
import DivWithPadding from "../atoms/DivWithPadding";
import { setFirstTimeAfterRegister } from "../../slices/authSlice";
import Heading from "../molecules/Heading";
import Main from "../organisms/layout/Main";
import { ArrowBack } from "@material-ui/icons";

type Props = {
    children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
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
            dispatch(handleOpenModal({
                title: 'プロフィール編集', 
                content: <ProfileForm />
            }))
            dispatch(handleOpenNotify({
                message: 'まずはプロフィールを編集しましょう！',
                type: 'success'
            }))
            dispatch(setFirstTimeAfterRegister(false))
        }
    }, [])
    
    return (
        <div className={classes.root}>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar 
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            {children}
        </div>
    )
})
export default AuthLayout