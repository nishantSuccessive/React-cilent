
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
import TraineeDetail from './pages/Trainee/TraineeDetail';


const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute path="/inputdemo" component={InputDemo} />
        <PrivateRoute path="/textfielddemo" component={TextFieldDemo} />
        <PrivateRoute exact path="/trainee" component={Trainee} />
        <PrivateRoute exact path="/trainee/:id" component={TraineeDetail} />

        <PrivateRoute path="/childrendemo" component={ChildrenDemo} />
        <PrivateRoute path="/" component={NoMatch} />


      </Switch>
    </Router>

  </MuiThemeProvider>
);

export default App;
