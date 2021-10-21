
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { ChatOutlined, HomeOutlined, TrendingUp } from '@material-ui/icons';
import { drawerWidth } from '../../../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
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
        color: '#efefef'
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


  const items = [
      {
          text: 'ホーム',
          icon: <HomeOutlined />
      },
      {
          text: '株の購入',
          icon: <TrendingUp />
      },
      {
          text: 'タイムライン',
          icon: <ChatOutlined />
      },
  ]

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
            <ListItemText className={classes.listItemText} primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
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
        <Hidden xsDown implementation="css">
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
