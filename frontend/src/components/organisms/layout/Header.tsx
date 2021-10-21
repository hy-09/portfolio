import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core'
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
          </Toolbar>
        </AppBar>
    )
}

export default Header
