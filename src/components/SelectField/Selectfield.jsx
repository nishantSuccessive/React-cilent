import React from 'react';
import PropTypes from 'prop-types';
import { styleClass } from './style';

export class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, options, defaultText, ...rest
    } = this.props;
    return (
      <div>
        <select style={styleClass.base} {...rest}>
          <option disabled selected>
            {defaultText}
          </option>
          {options.map(item => (
            <option>{item.label}</option>
          ))}
        </select>
        <p style={styleClass.error}>{error}</p>
      </div>
    );
  }
}

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf,
  defaultText: PropTypes.string,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};
