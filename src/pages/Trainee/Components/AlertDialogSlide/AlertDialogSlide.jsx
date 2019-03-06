import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export class AlertDialogSlide extends React.Component {
  state = {
    fullWidth: true,
    maxWidth: 'md',
  };

  render() {
    const { open, onClose } = this.props;
    const { fullWidth, maxWidth } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="responsive-dialog-title">Delete Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Do you really want to delete this trainee??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
          Disagree
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
          Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
AlertDialogSlide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
AlertDialogSlide.defaultProps = {
  open: false,
  onClose: () => {},
};
