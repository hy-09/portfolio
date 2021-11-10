import { Backdrop as MuiBackdrop, makeStyles } from "@material-ui/core"
import { FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { handleBackdropClose } from "../../slices/othersSlice"
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
    const { backdrop: { open } } = props
    
    return (
        <MuiBackdrop 
            open={open}
            className={classes.root} 
            onClick={() => dispatch(handleBackdropClose())}
        />
    )
}

export default Backdrop
