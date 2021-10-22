import { AppBar, Avatar, Badge, Button, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC, ReactNode } from 'react'
import { drawerWidth } from '../../../config';

type Props = {
    handleDrawerToggle: () => void;
}

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        backgroundColor: 'white',
        boxShadow: 'none'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    icons: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 'auto'
    },
    icon: {
        color: theme.palette.grey[500],
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}))

const Header: FC<Props> = (props) => {
    const { handleDrawerToggle } = props
    const classes = useStyles()

    return (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon style={{color: '#aaa'}} />
            </IconButton>
            <div className={classes.icons}>
                <IconButton>
                    <Badge badgeContent={2} color="secondary">
                        <NotificationsNoneOutlinedIcon className={classes.icon} />
                    </Badge>
                </IconButton>
                <IconButton>
                    <Avatar alt="アバター" src="https://picsum.photos/200" className={classes.avatar} />
                </IconButton>
            </div>
          </Toolbar>
        </AppBar>
    )
}

export default Header
