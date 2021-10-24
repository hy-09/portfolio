import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles(theme => ({
    circularProgressWrapper: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9999999,
    },
    circularProgress: {
        position: 'absolute',
        top: 'calc(50% - 25px)',
        left: 'calc(50% - 25px)',
    },
}))

const LoadingCircular: FC = () => {
    const classes = useStyles()

    return (
        <div className={classes.circularProgressWrapper}>
            <CircularProgress className={classes.circularProgress}/>
        </div>
    )
}

export default LoadingCircular
