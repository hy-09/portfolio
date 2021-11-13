import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, MenuList as MuiMenuList} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
        boxShadow: 'none',
    },
    menuItem: {
        fontSize: '0.875rem',
    },
    onClickAvatarIcon: {
        '&:last-of-type': {
            marginTop: '10px',
        }
    }
  }),
);

type Props = {
    buttonSize?: 'small' | 'medium'
    ButtonContent: any;
    items: Array<any>;
}

const MenuList: FC<Props> = (props) => {
    const { buttonSize='medium', ButtonContent, items } = props
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <IconButton
                size={buttonSize}
                ref={anchorRef}
                aria-haspopup="true"
                onClick={handleToggle} 
            >
                <ButtonContent />
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper className={classes.paper}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MuiMenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                            {items.map((item, i) => (
                                <MenuItem
                                    key={i}
                                    onClick={handleClose}
                                    className={classes.menuItem}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </MuiMenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
}

export default MenuList