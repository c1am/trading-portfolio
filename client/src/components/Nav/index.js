import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Auth from '../../utils/auth';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Typography className={classes.navButton}>
          <Link className={classes.navButton} color="inherit" href="/trade">Trade</Link>
          <Link className={classes.navButton} color="inherit" href="/portfolio">My Portfolio</Link>
          <Link color="inherit" href="/" onClick={() => Auth.logout()}>Logout</Link>
        </Typography>
      );
    } else {
      // console.log('Not logged in');
      return (
        <Typography className={classes.navButton}>
          <Link className={classes.navButton} color="inherit" href="/signup">Signup</Link>
          <Link color="inherit" href="/login">Login</Link>
        </Typography>
      );
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    navButton: {
      marginRight: theme.spacing(5),
    },
    title: {
      flexGrow: 1,
      fontSize: 50,
    },
    offset: theme.mixins.toolbar,
  }));

  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/">
          <TrendingUpIcon className={classes.title} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link color="inherit" href="/">Trade Coin</Link>
        </Typography>
        <nav>{showNavigation()}</nav>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
