import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = () => ({
  text: {
    textAlign: 'Center',
    marginTop: '10px',
  },
  forTextColor: {
    textAlign: 'Center',
    marginTop: '10px',
    color: 'gray',
  }
});


class NoMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h4" className={classes.text} gutterBottom>
        No Result Found
        </Typography>
        <Typography variant="h6" className={classes.forTextColor} gutterBottom>
          some text you are looking for is missing
        </Typography>
      </div>
    );
  }
}
NoMatch.propTypes = {
  classes: PropTypes.element.isRequired,
};
export default withStyles(styles)(NoMatch);
