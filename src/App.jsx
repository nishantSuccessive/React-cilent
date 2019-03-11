
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { theme } from './theme';
import {
  Trainee, InputDemo, TextFieldDemo, Login, ChildrenDemo,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import TraineeDetail from './pages/Trainee/TraineeDetail';
import { SnackbarProvider } from './contexts';

const App = () => (
  <SnackbarProvider>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/inputdemo" component={InputDemo} />
          <PrivateRoute path="/textfielddemo" component={TextFieldDemo} />
          <PrivateRoute exact path="/trainee" component={Trainee} />
          <PrivateRoute exact path="/trainee/:id" component={TraineeDetail} />

          <PrivateRoute path="/childrendemo" component={ChildrenDemo} />


        </Switch>
      </Router>

    </MuiThemeProvider>
  </SnackbarProvider>
);

export default App;
