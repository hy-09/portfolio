import { makeStyles, Snackbar as MuiSnackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { FC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { handleCloseNotify, handleCloseNotifyAndBackdrop } from '../../slices/othersSlice'
import { Notify } from '../../types/others'

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

type Props = {
    notify: Notify;
}

const Snackbar: FC<Props> = (props) => {
    const { notify: { open, type, message, onCloseMethod='closeOnlyNotify' } } = props
    const dispatch = useAppDispatch()
    const classes = useStyles()

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (onCloseMethod == 'closeOnlyNotify') {
            dispatch(handleCloseNotify())

        } else {
            dispatch(handleCloseNotifyAndBackdrop())
        }
    }

    return (
        <MuiSnackbar
            className={classes.root}
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert
                severity={type}
                onClose={handleClose}
            >
                {message}
            </Alert>
        </MuiSnackbar>
    )
}

export default Snackbar
