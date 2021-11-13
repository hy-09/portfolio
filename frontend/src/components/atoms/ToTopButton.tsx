import { IconButton, makeStyles } from "@material-ui/core"
import { ArrowBack, ArrowBackIos, KeyboardArrowLeft, KeyboardArrowUp } from "@material-ui/icons"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { drawerWidth } from "../../config"

const useStyles = makeStyles(theme => ({
    backIcon: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            bottom: theme.spacing(3),
            right: theme.spacing(3),
        },
        zIndex: theme.zIndex.drawer,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        boxShadow: theme.shadows[5]
    }
}))

const handleClick = () => {
    window.scroll({
        top: 0,
        behavior: "smooth",
    })
}

const ToTopButton: FC = () => {
    const classes = useStyles()
    
    return (
        <IconButton 
            className={classes.backIcon}
            onClick={handleClick}
        >
            <KeyboardArrowUp
                fontSize="large" 
                style={{color: 'white'}} 
            />
        </IconButton>
    )
}

export default ToTopButton
