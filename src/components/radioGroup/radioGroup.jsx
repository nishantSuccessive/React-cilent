import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { options, ...rest } = this.props;
    return (
      <Fragment>
        {options.map(item => (
          <div>
            <input type="radio" {...rest} name="Sports" value={options.value} />
            {item.label}
          </div>
        ))}
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
