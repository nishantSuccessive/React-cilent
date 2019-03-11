import React from 'react';
import {
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <>
    <Route
      {...rest}
      render={() => (
        <AuthLayout>
          <Component />
        </AuthLayout>
      )}
    />
  </>
);
AuthRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
export default AuthRoute;
