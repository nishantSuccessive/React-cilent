
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './theme';
import { Trainee, Navbar } from './pages';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Navbar />
    <Trainee />

  </MuiThemeProvider>
);

export default App;
