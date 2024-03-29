import { CircularProgress, makeStyles } from '@material-ui/core'
import { FC } from 'react'
import { useAppSelector } from '../../app/hooks'

const useStyles = makeStyles(theme => ({
    circularProgressWrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 1)',
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
    const isLoading = useAppSelector(state => state.others.isLoading)

    return (
        <>
        {isLoading && (
            <div className={classes.circularProgressWrapper}>
                <CircularProgress className={classes.circularProgress}/>
            </div>
        )}
        </>
    )
}

export default LoadingCircular
