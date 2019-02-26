import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/Mail';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string()
    .required('password is required.'),
});

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  textField: {
    width: '100%',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
      email: '',
      isTouched: {
        email: false,
        password: false,
      },
      hasErrors: {
        email: false,
        password: false,
      },
      error: {
        email: '',
        password: '',
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
        error, email, password, hasErrors,
      } = this.state;

      schema
        .validate({
          email, password,
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
      const { classes } = this.props;
      const {
        error,
        password,
        showPassword,
        email,
      } = this.state;
      return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
          Sign in
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
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
              </FormControl>
            </form>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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
              </FormControl>
            </form>
            {(this.forErrors()) ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
            Sign in
              </Button>
            ) : (
              <Button
                disabled
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
            Sign in
              </Button>
            )}

          </Paper>
        </main>
      );
    }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Login);
