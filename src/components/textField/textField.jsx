import React from 'react';
import styling from './style';

export const TextField = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, id } = props;
  const colorStyle = id === '3' ? styling.color : '';
  const newProp = { ...styling.base, ...colorStyle };
  return (
    <input type="textField" style={newProp} value={name} />
  );
};
