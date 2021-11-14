import { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Modal as MuiModal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { handleCloseModal } from '../../slices/othersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Title from '../atoms/Title';
import PaperWithPadding from '../atoms/PaperWithPadding';

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
  createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(0, 2),
        maxWidth: props => props.maxWidth,
        width: '100%',
    },
  }),
);

type Props = {
    maxWidth: string;
}

const Modal: FC = () => {
    const dispatch = useAppDispatch()
    const { title, content, open, maxWidth="330px" } = useAppSelector(state => state.others.modal)
    const props = { maxWidth: maxWidth }
    const classes = useStyles(props)

    return (
        <MuiModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={() => dispatch(handleCloseModal())}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 300,
            }}
        >
            <Fade in={open}>
                <PaperWithPadding responsivePadding={true} className={classes.paper}>
                    {title != undefined &&
                        <Box mb={3}>
                            <Title center={true}>
                                {title}
                            </Title>
                        </Box>
                    }
                    <div id="transition-modal-description">{content}</div>
                </PaperWithPadding>
            </Fade>
        </MuiModal>
    );
}
export default Modal