import { Backdrop as MuiBackdrop, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { handleCloseBackdrop, handleCloseNotifyAndBackdrop } from "../../slices/othersSlice"
import { Backdrop as TypeBackdrop } from "../../types/others"

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.snackbar - 1,
    }
}))

type Props = {
    backdrop: TypeBackdrop
}

const Backdrop: FC<Props> = (props) => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const { backdrop: { open, onCloseMethod='closeOnlyBackdrop' } } = props
    
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
