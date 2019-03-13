import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Close } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

const SnackbarContext = React.createContext();
const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};
const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  mess: {
    display: "flex",
    alignItems: "center"
  }
});

class SnackbarProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      message: "",
      status: ""
    };
  }

  openSnackbar = (message, status) => {
    this.setState({
      message,
      isOpen: true,
      status
    });
  };

  closeSnackbar = () => {
    this.setState({
      message: "",
      isOpen: false
    });
  };

  renderForSnackBarContent = () => {
    const { classes } = this.props;
    const { message, status } = this.state;
    const Icon = variantIcon[status];
    return (
      <SnackbarContent
        className={classes[status]}
        message={
          <span id="client-snackbar" className={classes.mess}>
            <Icon className={(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={this.closeSnackbar}>
            <Close />
          </IconButton>
        ]}
      />
    );
  };

  renderForSnackBar = () => {
    const { isOpen } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={isOpen}
        onClose={this.closeSnackbar}
        autoHideDuration={2000}
      >
        {this.renderForSnackBarContent()}
      </Snackbar>
    );
  };

  render() {
    const { children } = this.props;
    return (
      <SnackbarContext.Provider
        value={{
          openSnackbar: this.openSnackbar
        }}
      >
        {this.renderForSnackBar()}

        {children}
      </SnackbarContext.Provider>
    );
  }
}

export const SnackbarConsumer = SnackbarContext.Consumer;
export default withStyles(styles)(SnackbarProvider);
