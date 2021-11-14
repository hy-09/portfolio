import { AppBar, Avatar, IconButton, makeStyles, Toolbar, Tooltip } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { FC } from 'react'
import { drawerWidth } from '../../../config';
import MenuList from '../MenuList';
import { useHistory } from 'react-router';
import { handleOpenModal, resetOthersState } from '../../../slices/othersSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ProfileForm from '../../molecules/ProfileForm';
import { resetAuthState } from '../../../slices/authSlice';
import { resetStockState } from '../../../slices/stockSlice';
import { ExitToApp } from '@material-ui/icons';
import ChangeStockPriceUpdateFrequency from '../../molecules/ChangeStockPriceUpdateFrequency';
import { resetPostState } from '../../../slices/postSlice';

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
        color: theme.palette.secondary.light,
        fontSize: '26px'
    },
    badge: {
        '& .MuiBadge-anchorOriginTopRightRectangle': {
            top: '2px',
            right: '2px',
        }
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
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

    const items = [
        (  
            <div 
                onClick={() => {
                    dispatch(handleOpenModal({
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
                onClick={() => {
                    dispatch(handleOpenModal({
                        title: '株価の更新頻度', 
                        content: <ChangeStockPriceUpdateFrequency />
                    }))
                }}
            >
                株価の更新頻度
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
                <MenuList 
                    ButtonContent={() => (
                        <Avatar src={myprofile.img} className={classes.avatar} />
                    )}
                    items={items}
                />
                <Tooltip title="ログアウト">
                    <IconButton
                        onClick={() => {
                            localStorage.removeItem('localJWT')
                            dispatch(resetAuthState())
                            dispatch(resetStockState())
                            dispatch(resetOthersState())
                            dispatch(resetPostState())
                            history.push('/login')
                        }}
                    >
                        <ExitToApp className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
    )
}

export default Header
