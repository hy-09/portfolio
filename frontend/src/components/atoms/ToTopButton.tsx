import { IconButton, makeStyles } from "@material-ui/core"
import { KeyboardArrowUp } from "@material-ui/icons"
import { FC, useEffect, useState } from "react"
import clsx from "clsx"

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
        boxShadow: theme.shadows[5],
        transition: 'all .4s'
    },
    hidden: {
        opacity: 0,
        visibility: 'hidden',
    }
}))

const ToTopButton: FC = () => {
    const [show, setShow] = useState(false)
    const classes = useStyles()
  
    useEffect(() => {
        document.addEventListener('scroll', onScroll)
        return () => document.removeEventListener('scroll', onScroll)
    })

    const onScroll = () => {
        if (getScrollY() >= 200) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const getScrollY = () => {
       return Math.max(
            window.pageYOffset, 
            document.documentElement.scrollTop, 
            document.body.scrollTop
        )
    }

    const handleClick = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        })
    }
  
    return (
        <IconButton 
            className={show ? classes.backIcon : clsx(classes.backIcon, classes.hidden)}
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
