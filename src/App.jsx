
import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { theme } from './theme';


import { Trainee } from './pages';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Typography>
      <Trainee />
    </Typography>
  </MuiThemeProvider>
);

export default App;
