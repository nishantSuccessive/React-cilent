import React from 'react';
import PropTypes from 'prop-types';
import { styling } from './style';

export const TextField = (props) => {
  const { name, id } = props;
  const colorStyle = id === '3' ? styling.color : '';
  const newProp = { ...styling.base, ...colorStyle };
  return (
    <input type="textField" style={newProp} value={name} />
  );
};
TextField.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};
TextField.defaultProps = {
  name: '',
  id: '',
};
