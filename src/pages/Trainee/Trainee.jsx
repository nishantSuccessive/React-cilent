import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './Components';
import { styleForButton } from './style';

export class Trainee extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (name, email, password) => {
    this.setState({ open: false });
    console.log(name, email, password);
  };

  render() {
    const { open, fullWidth, maxWidth } = this.state;
    return (
      <div>
        <Button variant="outlined" style={styleForButton.base} color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        />
      </div>
    );
  }
}
