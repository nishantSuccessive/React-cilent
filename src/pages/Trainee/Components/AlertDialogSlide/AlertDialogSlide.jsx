import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes, { object } from 'prop-types';
import moment from 'moment';
import { SnackbarConsumer } from '../../../../contexts';

export class AlertDialogSlide extends React.Component {
  state = {
    fullWidth: true,
    maxWidth: 'md',
  };

  renderForButton = () => {
    const { onClose, data } = this.props;
    const date = moment('2019-02-14');
    return (

      <SnackbarConsumer>
        {({ openSnackbar }) => (
          <>
            <Button onClick={onClose} color="primary">
      Disagree
            </Button>
            <Button
              onClick={() => {
                onClose(data);
                if (moment(data.createdAt) < date) {
                  openSnackbar('Unable to Delete the trainee!', 'error');
                } else {
                  openSnackbar('Deleted the trainee!', 'success');
                }
              }}
              color="primary"
              autoFocus
            >
      Agree
            </Button>
          </>
        )}
      </SnackbarConsumer>

    );
  }

  render() {
    const { open } = this.props;
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
          { this.renderForButton()}
        </DialogActions>
      </Dialog>

    );
  }
}
AlertDialogSlide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.arrayOf(object).isRequired,
};
AlertDialogSlide.defaultProps = {
  open: false,
  onClose: () => {},
};
