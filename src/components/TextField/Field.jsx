import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField } from './TextField';

export const Field = (props) => {
  const {
    setText, name, id, ...rest
  } = props;
  return (
    <Fragment>
      {
        (id === '4')
          ? (
            <div>
              <h4 {...rest}>
                {setText}
              </h4>
            </div>
          )
          : (
            <div>
              <h4>{setText}</h4>
              <TextField name={name} {...rest} id={id} />
            </div>
          )
      }
    </Fragment>
  );
};
Field.propTypes = {
  setText: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
Field.defaultProps = {
  setText: '',
  name: '',
  id: '',
};
