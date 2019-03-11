import React from 'react';
import {
  Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';


const PrivateRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('key')) {
    return (
      <>
        <Route
          {...rest}
          render={matchprops => (
            <PrivateLayout>
              <Component {...matchprops} />
            </PrivateLayout>
          )}
        />
      </>
    );
  }
  return <Redirect to="/login" />;
};
PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
export default PrivateRoute;
