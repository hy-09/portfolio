import { FC, memo } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog as MuiDialog, makeStyles } from '@material-ui/core';

type Props = {
  open: boolean;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }
}))

const Dialog: FC<Props> = memo((props) => {
    const { open } = props;
    const classes = useStyles()

    return (
        <MuiDialog 
            open={open}
            className={classes.root}
        >
            <DialogTitle>Set backup account</DialogTitle>
        </MuiDialog>
    );
})
export default Dialog