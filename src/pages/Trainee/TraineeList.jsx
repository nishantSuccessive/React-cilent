import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import { trainees } from './data';
import { AddDialog } from './Components';
import { styleForButton } from './style';
import TraineeTable from './Components/TraineeTable/TraineeTable';


export class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'desc',
      orderBy: '',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };


  handleSort = (event, property) => {
    // const orderBy = property;
    // let order = 'desc';
    const { orderBy, order } = this.state;
    if (orderBy === property && order === 'asc') {
      return this.setState({ order: 'desc', orderBy: property });
    }

    return this.setState({ order: 'asc', orderBy: property });
  };

  getDateFormatted = (value) => {
    const formattedDate = moment(value).format('dddd, MMMM Do YYYY, h:mm:ss ');
    return formattedDate;
  }

  handleClose = (name, email, password) => {
    this.setState({ open: false });
    console.log(name, email, password);
  };

  handleSelect = (event, property) => {
    const { history } = this.props;
    history.replace(`/trainee/${property}`);
  };

  render() {
    const {
      open, fullWidth, maxWidth, order, orderBy,
    } = this.state;

    const items = trainees.map(item => <li><Link to={`/trainee/${item.id}`}>{item.name}</Link></li>);
    return (
      <div>
        <Button variant="outlined" style={styleForButton.base} color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        />
        <TraineeTable
          data={trainees}
          columns={[{
            field: 'name',
            label: 'Name',
          },
          {
            field: 'email',
            label: 'Email Address',
            format: value => value && value.toUpperCase(),
          },
          {
            field: 'createdAt',
            label: 'Date',
            align: 'right',
            format: this.getDateFormatted,
          },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        <div>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}
TraineeList.propTypes = {
  history: PropTypes.func.isRequired,
};
