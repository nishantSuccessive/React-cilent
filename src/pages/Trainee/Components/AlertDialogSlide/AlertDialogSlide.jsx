import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes, { object } from "prop-types";
import moment from "moment";
import { callApi } from "../../../../lib/utils/api";
import CircularProgress from "@material-ui/core/CircularProgress";

export class AlertDialogSlide extends React.Component {
  state = {
    fullWidth: true,
    maxWidth: "md"
  };

  handleClick = async (e, openSnackbar) => {
    const { onSubmit, data } = this.props;
    const { _id } = data;
    e.preventDefault();
    const { loading } = this.state;
    if (!loading) {
      this.setState({
        success: false,
        loading: true
      });
    }
    const output = await callApi("delete", `trainee/${_id}`, {});

    if (output.status === 200) {
      this.setState({
        loading: false
      });
      onSubmit();
      openSnackbar("successivefully deleted", "success");
    } else {
      this.setState({
        loading: false
      });
      openSnackbar("status not cleared", "error");
    }
    console.log("output is ", output);
  };

  renderForButton = () => {
    const { onCancel, data, openSnackbar } = this.props;
    const { loading } = this.state;
    const date = moment("2019-02-14");
    return (
      <>
        <Button onClick={onCancel} color="primary">
          Disagree
        </Button>
        <Button
          onClick={
            moment(data.createdAt) < date
              ? openSnackbar("Unable to Delete the trainee!", "error")
              : e => this.handleClick(e, openSnackbar)
          }
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Agree"}
        </Button>
      </>
    );
  };

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
        <DialogActions>{this.renderForButton()}</DialogActions>
      </Dialog>
    );
  }
}
AlertDialogSlide.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.arrayOf(object).isRequired
};
AlertDialogSlide.defaultProps = {
  open: false,
  onClose: () => {}
};
