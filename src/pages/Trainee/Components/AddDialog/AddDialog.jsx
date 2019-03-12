import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Email from "@material-ui/icons/Mail";
import Person from "@material-ui/icons/Person";
import * as yup from "yup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../../../../lib/utils/api";

const styles = () => ({
  root: {
    flexGrow: 1
  },
  textField: {
    width: "100%"
  }
});
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required("No password provided.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Password can contain at least one upper and lower letter and at least one numeric and special character."
    )
    .min(8),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirm is required")
});

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showconfirmpassword: false,
      fullWidth: true,
      maxWidth: "md",
      confirmpassword: "",
      isTouched: {
        name: false,
        email: false,
        password: false,
        confirmpassword: false
      },
      hasErrors: {
        name: false,
        email: false,
        password: false,
        confirmpassword: false
      },
      error: {
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
      },
      credentials: {
        name: "",
        email: "",
        password: ""
      }
    };
  }

  handleChange = field => event => {
    const { isTouched, credentials } = this.state;
    this.setState(
      {
        [field]: event.target.value,
        isTouched: { ...isTouched, [field]: true },
        credentials: { ...credentials, [field]: event.target.value }
      },
      () => this.validateErrors(field)
    );
  };

  forblur = value => {
    this.validateErrors(value);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({
      showconfirmpassword: !state.showconfirmpassword
    }));
  };

  forErrors = () => {
    const { hasErrors, isTouched } = this.state;
    const obj = Object.values(hasErrors);
    const objForTouched = Object.values(isTouched);
    let i;
    for (i = 0; i < obj.length; i += 1) {
      if (obj[i]) return false;
    }
    for (i = 0; i < objForTouched.length; i += 1) {
      if (!objForTouched[i]) return false;
    }
    return true;
  };

  validateErrors = value => {
    let isPresent = false;

    const { error, credentials, confirmpassword, hasErrors } = this.state;
    const { name, email, password } = credentials;
    schema
      .validate(
        {
          name,
          email,
          password,
          confirmpassword
        },
        { abortEarly: false }
      )
      .then(() => {
        this.setState({
          error: { ...error, [value]: "" },
          hasErrors: { ...hasErrors, [value]: false }
        });
      })
      .catch(err => {
        isPresent = true;
        err.inner.forEach(element => {
          if (element.path === value) {
            this.setState({
              error: { ...error, [value]: element.message },
              hasErrors: { ...hasErrors, [value]: true }
            });
          }
        });
        if (
          err.inner.some(option => option.path === value) &&
          hasErrors[value]
        ) {
          this.setState({
            error: { ...error, [value]: "" },
            hasErrors: { ...hasErrors, [value]: false }
          });
        }
      });
    if (!isPresent) {
      this.setState({
        error: { ...error, [value]: "" },
        hasErrors: { ...hasErrors, [value]: false }
      });
    }
  };

  handleClick = async (e, openSnackbar) => {
    const { credentials } = this.state;
    const { onSubmit } = this.props;
    e.preventDefault();
    const { loading } = this.state;
    if (!loading) {
      this.setState({
        success: false,
        loading: true
      });
    }
    console.log(localStorage.getItem("key"));

    const output = await callApi("post", "trainee", credentials);

    if (output.status === 200) {
      this.setState({
        loading: false
      });
      onSubmit(credentials);
      openSnackbar("successfully created", "success");
    } else {
      this.setState({
        loading: false
      });
      openSnackbar("status not cleared 400", "error");
    }
    console.log("output is ", output);
  };

  renderForName = () => {
    const { classes } = this.props;
    const { error, credentials } = this.state;
    return (
      <TextField
        error={Boolean(error.name)}
        required
        id="outlined-name"
        label="Name"
        value={credentials.name}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={this.handleChange("name")}
        helperText={error.name || ""}
        InputProps={{
          onBlur: () => this.forblur("name"),

          startAdornment: (
            <InputAdornment position="start">
              <IconButton>{<Person />}</IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  };

  renderForEmail = () => {
    const { classes } = this.props;
    const { error, credentials } = this.state;
    return (
      <TextField
        error={Boolean(error.email)}
        id="outlined-name"
        label="Email Address"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={credentials.email}
        onChange={this.handleChange("email")}
        onBlur={() => this.forblur("email")}
        helperText={error.email || ""}
        InputProps={{
          onBlur: () => this.forblur("email"),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>{<Email />}</IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  };

  renderForPassword = () => {
    const { classes } = this.props;
    const { error, credentials, showPassword } = this.state;
    return (
      <TextField
        error={Boolean(error.password)}
        InputProps={{
          onBlur: () => this.forblur("password"),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        id="outlined-name"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={credentials.password}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={this.handleChange("password")}
        onBlur={() => this.forblur("password")}
        helperText={error.password || ""}
      />
    );
  };

  renderForConfirmPassword = () => {
    const { classes } = this.props;
    const { error, confirmpassword, showconfirmpassword } = this.state;
    return (
      <TextField
        error={Boolean(error.confirmpassword)}
        InputProps={{
          onBlur: () => this.forblur("confirmpassword"),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowConfirmPassword}
              >
                {showconfirmpassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        id="outlined-name"
        label="Confirm Password"
        type={showconfirmpassword ? "text" : "password"}
        value={confirmpassword}
        onBlur={() => this.forblur("confirmpassword")}
        helperText={error.confirmpassword || ""}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={this.handleChange("confirmpassword")}
      />
    );
  };

  render() {
    const { open, onClose, classes, onCancel, openSnackbar } = this.props;
    const { password, fullWidth, maxWidth, name, email, loading } = this.state;
    return (
      <Fragment>
        <Dialog
          keepMounted
          open={open}
          onClose={onClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your Trainee details</DialogContentText>
            <div className={classes.root}>
              {this.renderForName()}

              {this.renderForEmail()}
              <Grid container spacing={24}>
                <Grid item xs>
                  {this.renderForPassword()}
                </Grid>
                <Grid item xs>
                  {this.renderForConfirmPassword()}
                </Grid>
              </Grid>
            </div>
          </DialogContent>

          <DialogActions>
            <Button color="primary" onClick={onCancel}>
              Cancel
            </Button>
            {this.forErrors() ? (
              <Button
                color="primary"
                disabled={loading}
                onClick={e => this.handleClick(e, openSnackbar)}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            ) : (
              <Button disabled>Submit</Button>
            )}
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
AddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.object).isRequired
};
AddDialog.defaultProps = {
  open: false,
  onClose: () => {}
};

export default withStyles(styles)(AddDialog);
