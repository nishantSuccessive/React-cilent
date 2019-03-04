import React from 'react';
import {
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <>
    <Route
      {...rest}
      render={() => (
        <PrivateLayout>
          <Component />
        </PrivateLayout>
      )}
    />
  </>
);
PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
export default PrivateRoute;
