import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Mail';
import Person from '@material-ui/icons/Person';
import * as yup from 'yup';
import { SnackbarConsumer } from '../../../../contexts';
import { callApi } from '../../../../lib/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';


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

class EditTrainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      fullWidth: true,
      maxWidth: 'md',
      isTouched: {
        name: false,
        email: false,
      },
      hasErrors: {
        name: false,
        email: false,
      },
      error: {
        name: '',
        email: '',
      },
      error: {
        name: '',
        email: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("calling set derived state mthod!!!!!!!!!!")
    const { data } = nextProps;
    if((prevState.name !== '') || (prevState.email !== '')) {
    if ((prevState.name === data.name) || (prevState.email === data.email)) {
      return { name: prevState.name, email: prevState.email };
    }
  }
    return {
      name: data.name,
      email: data.email,
    };
  }

  handleClick = async (e, openSnackbar) => {
    console.log("Calling handle click!!!!!!!!!!!")
    const { name, email } = this.state;
    const { onClose, data } = this.props;
    e.preventDefault();
    const { loading } = this.state;
    if (!loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
      );
    }
    console.log(localStorage.getItem('key'))

    const output = await callApi('put', 'trainee', {id: data._id, name: name, email: email});

    if (output.status === 200) {

      this.setState(
        {
          loading: false,
          name,
          email,
        },
      );
      onClose({name, email});
      openSnackbar('successivefully created', 'success');

    } else {
      this.setState(
        {
          loading: false,
        },
      );
      openSnackbar('status not cleared 400', 'error');
    }
    console.log('output is ', output);
  }


handleChange = field => (event) => {
  console.log("calling handle change")
  const { isTouched } = this.state;
  this.setState(
    {
      [field]: event.target.value,
      isTouched: { ...isTouched, [field]: true },
    },
    () => this.validateErrors(field),
  );
};


  forblur = (value) => {
    this.validateErrors(value);
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

  validateErrors = (value) => {
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
        if (err.inner.some(option => option.path === value) && hasErrors[value]) {
          this.setState({
            error: { ...error, [value]: '' },
            hasErrors: { ...hasErrors, [value]: false },
          });
        }
      });
    if (!isPresent) {
      this.setState({
        error: { ...error, [value]: '' },
        hasErrors: { ...hasErrors, [value]: false },

      });
    }
  };

renderForTextFieldEmail = () => {
  const { classes } = this.props;
  const {
    error, email,
  } = this.state;
  return (
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
  );
}

renderForTextFieldName = () => {
  const { classes } = this.props;
  const { error, name } = this.state;
  return (
    <TextField
      error={Boolean(error.name)}
      required
      id="outlined-name"
      value={name}
      label="Name"
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
  );
}


render() {
  console.log("calling render")
  const {
    open, onClose, classes,
  } = this.props;
  const {
    fullWidth,
    maxWidth, loading,
  } = this.state;
  return (
    <Fragment>
      <SnackbarConsumer>
        {({ openSnackbar }) => (
          <Dialog
            keepMounted
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
          >
            <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your Trainee details</DialogContentText>
              <div className={classes.root}>
                {this.renderForTextFieldName()}
                {this.renderForTextFieldEmail()}
              </div>
            </DialogContent>

            <DialogActions>
              <Button color="primary" onClick={onClose}>Cancel</Button>
              {(this.forErrors()) ? <Button color="primary" onClick={e => this.handleClick(e, openSnackbar)}>  { loading ? (<CircularProgress size={24} />) : 'Submit'} </Button> : <Button disabled>Submit</Button>}
            </DialogActions>
          </Dialog>

        )}
      </SnackbarConsumer>
    </Fragment>
  );
}
}
EditTrainee.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
EditTrainee.defaultProps = {
  open: false,
  onClose: () => {},
};

export default withStyles(styles)(EditTrainee);
