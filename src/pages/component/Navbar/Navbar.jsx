import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    flexGrow: 0.07,
  },
};


export class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          TRAINEE PORTAL
          </Typography>
          <Button color="inherit">TRAINEE</Button>
          <Button color="inherit">TEXTFIELDDEMO</Button>
          <Button color="inherit">INPUTDEMO</Button>
          <Button color="inherit">CHILDRENDEMO</Button>
          <Button color="inherit" className={classes.logout}>LOGOUT</Button>


        </Toolbar>

      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(Navbar);
