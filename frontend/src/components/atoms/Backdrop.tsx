import { Backdrop as MuiBackdrop, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { handleCloseBackdrop, handleCloseNotifyAndBackdrop } from "../../slices/othersSlice"
import { Backdrop as TypeBackdrop } from "../../types/others"

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.snackbar - 1,
    }
}))

const Backdrop: FC = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { open, onCloseMethod='closeOnlyBackdrop' } = useAppSelector(state => state.others.backdrop)
    
    return (
        <MuiBackdrop 
            open={open}
            className={classes.root} 
            onClick={() => {
                if (onCloseMethod == 'closeOnlyBackdrop') {
                    dispatch(handleCloseBackdrop())

                } else {
                    dispatch(handleCloseNotifyAndBackdrop())
                }
            }}
        />
    )
}

export default Backdrop
