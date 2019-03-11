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

  handleClose = (data) => {
    this.setState({
      open: false,
      editTrainee: false,
    });
    console.log(data.name, data.email, data.password);
  };

  handleCloseEditTrainee = (name, email) => {
    this.setState({ open: false, editTrainee: false, user: '', name, email });
    console.log('Edit trainee', name, email);
        this.handleChangePage();
  };

  handleCloseDeleteTrainee = () => {
    this.setState({ open: false, deleteTrainee: false, user: '',                                                                                                                                                                });
    this.handleChangePage();

  };

  handleSelect = (event, property) => {
    const { history } = this.props;
    history.replace(`/trainee/${property}`);
  };


  handleChangePage = (e, pages) => {
    const newskip =  10 * (pages+1);
    const newlimit =  10 ;
    this.setState({ page: pages, skip: newskip , limit: newlimit })
    callApi('get', `trainee?limit=${newlimit}&skip=${newskip}`, {}).then((res)=>{ console.log("response",res.data.data);this.setState({ dataList: res.data.data.records });});


  };

  componentDidMount() {
    const {
    skip, limit,
    } = this.state;
    callApi('get', `trainee?limit=${limit}&skip=${skip}`, {}).then((res)=>{ console.log("response",res.data.data);this.setState({ dataList: res.data.data.records, loading: false });});

  }

  render() {

    const {
      open, fullWidth, maxWidth, order, orderBy, rowsPerPage, page, editTrainee, deleteTrainee, user, dataList, loading,
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
          dataLength={dataList.count}
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
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
