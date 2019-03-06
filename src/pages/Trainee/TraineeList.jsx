import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { trainees } from './data';
import { AddDialog } from './Components';
import { styleForButton } from './style';
import TraineeTable from './Components/TraineeTable/TraineeTable';
import { EditTrainee } from './Components/EditTrainee';
import { AlertDialogSlide } from './Components/AlertDialogSlide';


export class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'desc',
      editTrainee: false,
      deleteTrainee: false,
      orderBy: '',
      page: 0,
      rowsPerPage: 10,
      user: '',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleEditDialogOpen = (event, property) => {
    this.setState({ editTrainee: true, user: property });
  };

  handleDeleteDialogOpen = (event, property) => {
    this.setState({ deleteTrainee: true, user: property });
  };

  handleSort = (event, property) => {
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
    this.setState({
      open: false,
      editTrainee: false,
    });
    console.log(name, email, password);
  };

  handleCloseEditTrainee = (name, email) => {
    this.setState({ open: false, editTrainee: false, user: '' });
    console.log('Edit trainee', name, email);
  };

  handleCloseDeleteTrainee = (data) => {
    console.log('Deleted trainee', data);
    this.setState({ open: false, deleteTrainee: false, user: '' });
  };

  handleSelect = (event, property) => {
    const { history } = this.props;
    history.replace(`/trainee/${property}`);
  };


  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  render() {
    const {
      open, fullWidth, maxWidth, order, orderBy, rowsPerPage, page, editTrainee, deleteTrainee, user,
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
        <EditTrainee
          open={editTrainee}
          onClose={this.handleCloseEditTrainee}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          data={user}
        />

        <AlertDialogSlide
          open={deleteTrainee}
          onClose={this.handleCloseDeleteTrainee}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          data={user}
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
            align: 'center',
            format: this.getDateFormatted,
          },
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handle: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handle: this.handleDeleteDialogOpen,

            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          onChangePage={this.handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
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
