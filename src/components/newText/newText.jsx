import React from 'react';
import PropTypes from 'prop-types';

export class NewText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <input type="textField" {...this.props} />;
  }
}

NewText.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
NewText.defaultProps = {
  error: '',
};
