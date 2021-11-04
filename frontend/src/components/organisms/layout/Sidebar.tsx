
import { Box, Link } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { ChatOutlined, HomeOutlined, TrendingUp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { drawerWidth } from '../../../config';
import { HomeRoutes, homeURL } from '../../../router/HomeRoutes';
import { stockURL } from '../../../router/StockRoutes';
import { timelineURL } from '../../../router/TimelineRoute';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.shadows[1]
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listItemIcon: {
        color: 'rgba(239, 239, 239, 0.7)',
        marginRight: theme.spacing(-2.5),
        marginLeft: theme.spacing(2),
    },
    listItemText: {
        color: theme.palette.primary.contrastText,
    }
  }),
);

type Props = {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar(props: Props) {
  const { window, mobileOpen, handleDrawerToggle } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()
  const routes = [
      {
        path: '',
        title: 'ホーム',
        icon: <HomeOutlined />,
      },
      {
        path: stockURL,
        title: '銘柄一覧',
        icon: <TrendingUp />,
      },
      {
        path: timelineURL,
        title: 'タイムライン',
        icon: <ChatOutlined />,
      }
  ]

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
            {routes.map((route) => (
                <Link key={route.title} onClick={() => history.push(`${homeURL}${route.path}`)}>
                    <ListItem button>
                        <ListItemIcon className={classes.listItemIcon}>{route.icon}</ListItemIcon>
                        <ListItemText className={classes.listItemText} primary={route.title} />                 
                    </ListItem>
                </Link>
            ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
  );
}
