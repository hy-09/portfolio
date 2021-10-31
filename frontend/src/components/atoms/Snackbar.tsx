import { makeStyles, Snackbar as MuiSnackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { FC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { handleNotifyClose } from '../../slices/othersSlice'
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
    const { notify } = props
    const dispatch = useAppDispatch()
    const classes = useStyles()

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(handleNotifyClose())
    }

    return (
        <MuiSnackbar
            className={classes.root}
            open={notify.open}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </MuiSnackbar>
    )
}

export default Snackbar
