import React from 'react';
import PropTypes from 'prop-types';

export class Math extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  findResult = (first, second, operator) => {
    if (operator === '/' && second !== 0) {
      return first / second;
    }
    if (operator === '/' && second === 0) {
      return 'Can not divide with 0';
    }
    if (operator === '+') {
      return first + second;
    }
    if (operator === '-') {
      return first - second;
    }
    if (operator === '*') {
      return first * second;
    }
    return 'not valid operator';
  };

  render() {
    const {
      first, second, operator, children,
    } = this.props;


    const result = this.findResult(first, second, operator);
    return (
      <div>
        {children(first, operator, second, result)}
      </div>
    );
  }
}
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
Math.defaultProps = {
  children: () => {},
};
