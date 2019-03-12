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
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts';


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
      dataList: '',
      skip: 0,
      limit: 10,
      loading: true,
      error: '',
      totalData: '',
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

  dialogHandleSubmit = (data) => {
    this.setState({
      open: false,
      editTrainee: false,
    });
    console.log(data.name, data.email, data.password);
  };

  dialogHandleCancel = () => {
    this.setState({
      open: false,
      editTrainee: false,
    });
  }

  editHandleSubmit = (name, email) => {
    this.setState({ open: false, editTrainee: false, user: '', name, email });
    console.log('Edit trainee', name, email);
        this.handleChangePage();
  };

  editHandleCancel = () => {
    this.setState({
      open: false,
      editTrainee: false,
    });
  }

  deleteHandleSubmit = () => {
    this.setState({ open: false, deleteTrainee: false, user: ''});
    this.handleChangePage();
};


deleteHandleCancel = () => {
  this.setState({
    open: false,
    deleteTrainee: false,
  });
}
  handleSelect = (event, property) => {
    const { history } = this.props;
    history.replace(`/trainee/${property}`);
  };


  handleChangePage = (e, pages) => {
    const newskip =  10 * (pages);
    const newlimit =  10 ;
    this.setState({ page: pages, skip: newskip , limit: newlimit, loading: true })
    callApi('get', `trainee?limit=${newlimit}&skip=${newskip}`, {}).then((res)=>{this.setState({ dataList: res.data.data.records, loading: false });});


  };

  componentDidMount() {
    const {
    skip, limit,
    } = this.state;
    callApi('get', `trainee?limit=${limit}&skip=${skip}`, {}).then((res)=>{this.setState({ dataList: res.data.data.records, loading: false, totalData: res.data.data.count });}).catch((err)=>{this.setState({error: err, loading: false})});

  }
  handleSnackbar = (openSnackbar) => {
    openSnackbar("Wrong api call", "error")
    this.setState({error: ''})
  }

  render() {

    const {
      open, fullWidth, maxWidth, order, orderBy, rowsPerPage, page, editTrainee, deleteTrainee, user, error, dataList, loading, totalData,
    } = this.state;

    return (
      <SnackbarConsumer>
      {({ openSnackbar }) => {
        if(!error) {
          return (
      <div>
        <Button variant="outlined" style={styleForButton.base} color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onSubmit={this.dialogHandleSubmit}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          onCancel={this.dialogHandleCancel}
          openSnackbar={openSnackbar}
        />
        <EditTrainee
          open={editTrainee}
          onSubmit={this.editHandleSubmit}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          data={user}
          onCancel={this.editHandleCancel}
          openSnackbar={openSnackbar}

        />

        <AlertDialogSlide
          open={deleteTrainee}
          onSubmit={this.deleteHandleSubmit}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          data={user}
          onCancel={this.deleteHandleCancel}
          openSnackbar={openSnackbar}
         />

        <TraineeTable
          data={dataList || trainees}
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
          loading={loading}
          dataLength={dataList.length}
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
          error={error}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={totalData}
          onChangePage={this.handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </div>)
         }
         return this.handleSnackbar(openSnackbar)
         } }
              </SnackbarConsumer>
    );
  }
}
TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
