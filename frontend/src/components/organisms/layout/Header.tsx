import { AppBar, Avatar, Badge, Button, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC, ReactNode, useState } from 'react'
import { drawerWidth } from '../../../config';
import MenuList from '../MenuList';
import { useHistory } from 'react-router';
import Dialog from '../Dialog';
import Modal from '../Modal';
import { handleModalOpen, handleSetModalContent } from '../../../slices/componentSlice';
import { useAppDispatch } from '../../../app/hooks';
import ProfileForm from '../../molecules/ProfileForm';

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
    },
    menuListItem: {
        color: theme.palette.grey[600],
        fontSize: '0.875rem'
    },
}))

const Header: FC<Props> = (props) => {
    const { handleDrawerToggle } = props
    const dispatch = useAppDispatch()
    const history = useHistory()
    const classes = useStyles()

    const items = [
        (  
            <>
            <div 
                className={classes.menuListItem}
                onClick={() => {
                    dispatch(handleSetModalContent({title: 'プロフィール編集', content: <ProfileForm />}))
                    dispatch(handleModalOpen())
                }}
            >
                プロフィール
            </div>
            </>
        )
        ,
        (
            <div 
                className={classes.menuListItem}
                onClick={() => {
                    localStorage.removeItem('localJWT')
                    history.push('/login')
                    window.location.reload()
                }}
            >
                ログアウト
            </div>
        )
    ]

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
                <MenuList 
                    Button={IconButton} 
                    ButtonContent={() => (
                        <Avatar alt="アバター" src="https://picsum.photos/200" className={classes.avatar} />
                    )}
                    items={items}
                />
            </div>
          </Toolbar>
        </AppBar>
    )
}

export default Header
