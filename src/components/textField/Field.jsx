import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField } from './textField';

export const Field = (props) => {
  const { setText, name } = props;
  return (
    <Fragment>
      <h4>{setText}</h4>
      <TextField name={name} />
    </Fragment>
  );
};
Field.propTypes = {
  setText: PropTypes.string,
  name: PropTypes.string,
};
Field.defaultProps = {
  setText: '',
  name: '',
};
