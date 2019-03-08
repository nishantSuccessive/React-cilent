import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { white } from 'material-ui/styles/colors';
import { Redirect } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    marginLeft: '30px',
  },
  forLink: {
    color: white,
    textDecoration: 'none',
  },
};


export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  logOutButton = () => {
    localStorage.clear();
    return (
      <Redirect to="/login" />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>

          <Typography color="inherit" className={classes.grow}>
          TRAINEE PORTAL
          </Typography>
          <Link to="/trainee" className={classes.forLink}>
            <Button color="inherit">
                Trainee
            </Button>
          </Link>
          <Link to="/textfielddemo" className={classes.forLink}>
            <Button color="inherit">
            TEXT FIELD DEMO
            </Button>
          </Link>
          <Link to="/inputdemo" className={classes.forLink}>
            <Button color="inherit">
            INPUT DEMO
            </Button>
          </Link>
          <Link to="/childrendemo" className={classes.forLink}>
            <Button color="inherit">
            CHILDREN DEMO
            </Button>
          </Link>
          <Link to="/login" className={classes.forLink}>
            <Button color="inherit">
            LOGIN
            </Button>
          </Link>
          <Button color="inherit" className={classes.logout} onClick={this.logOutButton()}>
            <Link to="/login" className={classes.forLink}>
            LOGOUT
            </Link>
          </Button>


        </Toolbar>

      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(Navbar);
