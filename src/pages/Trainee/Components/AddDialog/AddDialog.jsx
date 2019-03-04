import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/Mail';
import Person from '@material-ui/icons/Person';
import * as yup from 'yup';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '100%',
  },
});
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .required('No password provided.')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      'Password can contain at least one upper and lower letter and at least one numeric and special character.').min(8),
  confirmpassword: yup.string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
      showconfirmpassword: false,
      fullWidth: true,
      maxWidth: 'md',
      name: '',
      email: '',
      confirmpassword: '',
      isTouched: {
        name: false,
        email: false,
        password: false,
        confirmpassword: false,
      },
      hasErrors: {
        name: false,
        email: false,
        password: false,
        confirmpassword: false,
      },
      error: {
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
      },
    };
  }

  handleChange = Field => (event) => {
    const { isTouched } = this.state;
    this.setState(
      {
        [Field]: event.target.value,
        isTouched: { ...isTouched, [Field]: true },
      },
      this.Validate(Field),
    );
  };


  forblur = (value) => {
    this.Validate(value);
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickShowConfirmPassword = () => {
    this.setState(state => ({ showconfirmpassword: !state.showconfirmpassword }));
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
  }

  Validate = (value) => {
    let isPresent = false;
    const {
      error, name, email, password, confirmpassword, hasErrors,
    } = this.state;

    schema
      .validate({
        name, email, password, confirmpassword,
      }, { abortEarly: false })
      .then(() => {
        this.setState({
          error: { ...error, [value]: '' },
          hasErrors: { ...hasErrors, [value]: false },
        });
      })
      .catch((err) => {
        isPresent = true;
        err.inner.forEach((element) => {
          if (element.path === value) {
            this.setState({
              error: { ...error, [value]: element.message },
              hasErrors: { ...hasErrors, [value]: true },
            });
          }
        });
      });
    if (!isPresent) {
      this.setState({
        error: { ...error, [value]: '' },
        hasErrors: { ...hasErrors, [value]: false },
      });
    }
  };

  render() {
    const { open, onClose, classes } = this.props;
    const {
      error,
      password,
      showPassword,
      fullWidth,
      maxWidth,
      name,
      email,
      confirmpassword,
      showconfirmpassword,
    } = this.state;
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
              <TextField
                error={Boolean(error.name)}
                required
                id="outlined-name"
                label="Name"
                value={name}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange('name')}
                helperText={error.name || ''}
                InputProps={{
                  onBlur: () => this.forblur('name'),

                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>{<Person />}</IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                error={Boolean(error.email)}
                id="outlined-name"
                label="Email Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={email}
                onChange={this.handleChange('email')}
                onBlur={() => this.forblur('email')}
                helperText={error.email || ''}
                InputProps={{
                  onBlur: () => this.forblur('email'),
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>{<Email />}</IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Grid container spacing={24}>
                <Grid item xs>
                  <TextField
                    error={Boolean(error.password)}

                    InputProps={{
                      onBlur: () => this.forblur('password'),
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="outlined-name"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('password')}
                    onBlur={() => this.forblur('password')}
                    helperText={error.password || ''}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    error={Boolean(error.confirmpassword)}

                    InputProps={{
                      onBlur: () => this.forblur('confirmpassword'),
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowConfirmPassword}
                          >
                            {showconfirmpassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id="outlined-name"
                    label="Confirm Password"
                    type={showconfirmpassword ? 'text' : 'password'}
                    value={confirmpassword}
                    onBlur={() => this.forblur('confirmpassword')}
                    helperText={error.confirmpassword || ''}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange('confirmpassword')}
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>

          <DialogActions>
            <Button color="primary">Cancel</Button>
            {(this.forErrors()) ? <Button color="primary" onClick={() => onClose(name, email, password)}>Submit</Button> : <Button disabled>Submit</Button>}
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
AddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
AddDialog.defaultProps = {
  open: false,
  onClose: () => {},
};

export default withStyles(styles)(AddDialog);
