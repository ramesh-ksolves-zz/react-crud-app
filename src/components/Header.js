import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import logo from '../logo.svg'

// Not in use
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>
            <img src={logo} alt="" width="100" />
          </div>
          <Typography variant="h6" className={classes.title} align="center">
            Welcome to BuildOps Coding Challenge !!
                    </Typography>

        </Toolbar>
      </AppBar>
    </div>
  )
}


export default Header