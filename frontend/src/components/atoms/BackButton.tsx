import { IconButton, makeStyles } from "@material-ui/core"
import { KeyboardArrowLeft } from "@material-ui/icons"
import { FC } from "react"
import { useHistory } from "react-router-dom"
import { drawerWidth } from "../../config"

const useStyles = makeStyles(theme => ({
    backIcon: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            bottom: theme.spacing(3),
            left: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            left: drawerWidth + theme.spacing(3),
        },
        zIndex: theme.zIndex.drawer,
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        boxShadow: theme.shadows[5]
    }
}))

type Props = {
    show?: boolean;
}


const BackButton: FC<Props> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const { show=false } = props
    
    return (
        <>
        {show && (
            <IconButton 
                className={classes.backIcon}
                onClick={() => history.goBack()}
            >
                <KeyboardArrowLeft 
                    fontSize="large" 
                    style={{color: 'white'}} 
                />
            </IconButton>
        )}
        </>
    )
}

export default BackButton
