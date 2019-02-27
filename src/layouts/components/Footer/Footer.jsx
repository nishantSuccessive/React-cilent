import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styleForFoot } from './style';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  logout: {
    flexGrow: 0.07,
  },
};

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <footer style={styleForFoot.base}> ⓒSuccessive technologies </footer>
      </>
    );
  }
}

export default withStyles(styles)(Footer);
