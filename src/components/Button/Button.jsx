import React from 'react';
import PropTypes from 'prop-types';
import { styleForButton } from './style';

export class Button extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      color, style, value, ...rest
    } = this.props;
    return (
      <input
        type="button"
        value={value}
        {...rest}
        style={{ ...styleForButton.base, ...style }}
      />
    );
  }
}
Button.propTypes = {
  color: PropTypes.string,
  value: PropTypes.string.isRequired,
  style: PropTypes.arrayOf,
};
Button.defaultProps = {
  color: 'default',
  style: {},
};
