import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { TraineeList } from './TraineeList';
import TraineeDetail from './TraineeDetail';

export class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path={`${match.path}`} component={TraineeList} />
          <Route exact path={`${match.path}/:id`} component={TraineeDetail} />
        </Switch>
      </div>
    );
  }
}
Trainee.propTypes = {
  match: PropTypes.arrayOf.isRequired,
};
