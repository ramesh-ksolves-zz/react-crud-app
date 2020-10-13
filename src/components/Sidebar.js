import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import logo from '../logo.svg'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (path) => history.push(path);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div>
            <img src={logo} alt="" width="90" />
          </div>
          <Typography variant="h6" className={classes.title} align="center">
            Welcome to BuildOps Coding Challenge !!
        </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button onClick={() => handleClick('/')} >
            <IconButton>
              <HomeIcon />
            </IconButton>
            <ListItemText primary="Home"/>
          </ListItem>
          <ListItem button onClick={() => handleClick('/employees')}>
            <IconButton>
              <PersonIcon />
            </IconButton>
            <ListItemText primary="Employees"/>
          </ListItem>
        </List>

      </Drawer>

    </div>
  );
}

export default Sidebar