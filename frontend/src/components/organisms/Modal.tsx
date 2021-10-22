import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal as MuiModal} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { handleModalClose } from '../../slices/componentSlice';
import { useAppDispatch } from '../../app/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type Props = {
    open: boolean;
}

const Modal: FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const classes = useStyles();
    const { open } = props
  
    return (
        <MuiModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => dispatch(handleModalClose())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <div className={classes.paper}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
            </Fade>
        </MuiModal>
    );
}
export default Modal