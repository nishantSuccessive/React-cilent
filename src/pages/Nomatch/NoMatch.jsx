import React from 'react';
import { Typography } from '@material-ui/core';

class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
        No Result Found
        </Typography>
        <Typography component="h2" variant="display1" gutterBottom>
          Display 1
        </Typography>
      </div>
    );
  }
}
export default NoMatch;
