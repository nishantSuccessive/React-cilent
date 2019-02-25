import React from 'react';
import PropTypes from 'prop-types';
import { styleForTextField } from './style';

export class NewText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { error, ...rest } = this.props;
    return (
      <div>
        <input type="textField" style={styleForTextField.base} {...rest} />
        <p style={styleForTextField.error}>{error}</p>
      </div>
    );
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
