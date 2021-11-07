import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Modal as MuiModal, Paper, Typography} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { handleModalClose } from '../../slices/othersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Modal as TypeModal } from '../../types/others';
import Title from '../atoms/Title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[0],
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(0, 1)
    },
  }),
);

type Props = {
    modal: TypeModal;
}

const Modal: FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const classes = useStyles();
    const { modal: { title, content, open } } = props
  
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
                timeout: 300,
            }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    {title != undefined &&
                        <Box mb={3}>
                            <Title center={true}>
                                {title}
                            </Title>
                        </Box>
                    }
                    <div id="transition-modal-description">{content}</div>
                </Paper>
            </Fade>
        </MuiModal>
    );
}
export default Modal