import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { styleForRadio } from './style';

export class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      error, options, ...rest
    } = this.props;
    return (
      <Fragment>
        {options.map(item => (
          <div>
            <input type="radio" {...rest} name="Sports" key={item.label} value={item.label} />
            {item.label}
          </div>
        ))}
        <p style={styleForRadio.error}>{error}</p>
      </Fragment>
    );
  }
}
RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};
