import { AppBar, Avatar, Badge, Button, Divider, IconButton, makeStyles, Toolbar } from '@material-ui/core'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React, { FC, ReactNode, useState } from 'react'
import { drawerWidth } from '../../../config';
import MenuList from '../MenuList';
import { useHistory } from 'react-router';
import { handleModalOpen } from '../../../slices/othersSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProfileForm from '../../molecules/ProfileForm';
import clsx from 'clsx'

type Props = {
    handleDrawerToggle: () => void;
}

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
        },
        backgroundColor: 'white',
        boxShadow: 'none'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
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
        fontSize: '30px'
    },
    badge: {
        '& .MuiBadge-anchorOriginTopRightRectangle': {
            top: '4px',
            right: '4px',
        }
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    menuListItem: {
        color: theme.palette.grey[600],
        fontSize: '0.875rem'
    },
    logout: {
        color: theme.palette.secondary.main
    }
}))

const Header: FC<Props> = (props) => {
    const { handleDrawerToggle } = props
    const myprofile = useAppSelector(state => state.auth.myprofile)
    const dispatch = useAppDispatch()
    const history = useHistory()
    const classes = useStyles()
    const logoutItem = clsx(classes.menuListItem, classes.logout)

    const items = [
        (  
            <div 
                className={classes.menuListItem}
                onClick={() => {
                    dispatch(handleModalOpen({
                        title: 'プロフィール編集', 
                        content: <ProfileForm />
                    }))
                }}
            >
                プロフィール
            </div>
        )
        ,
        (
            <div 
                className={logoutItem}
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
                    <Badge badgeContent={2} color="secondary" className={classes.badge}>
                        <NotificationsNoneOutlinedIcon className={classes.icon} />
                    </Badge>
                </IconButton>
                <MenuList 
                    Button={IconButton} 
                    ButtonContent={() => (
                        <Avatar src={myprofile.img === null ? undefined : myprofile.img} className={classes.avatar} />
                    )}
                    items={items}
                    classType='onClickAvatarIcon'
                />
            </div>
          </Toolbar>
        </AppBar>
    )
}

export default Header
