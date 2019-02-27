
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { theme } from './theme';
import {
  Trainee, InputDemo, TextFieldDemo, Login, ChildrenDemo, NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute path="/inputdemo" component={InputDemo} />
        <PrivateRoute path="/textfielddemo" component={TextFieldDemo} />
        <PrivateRoute path="/trainee" component={Trainee} />

        <PrivateRoute path="/childrendemo" component={ChildrenDemo} />
        <PrivateRoute path="/" component={NoMatch} />


      </Switch>
    </Router>

  </MuiThemeProvider>
);

export default App;
