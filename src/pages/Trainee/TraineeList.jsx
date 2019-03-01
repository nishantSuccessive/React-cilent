import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { trainees } from './data';
import { AddDialog } from './Components';
import { styleForButton } from './style';
import TraineeTable from './Components/TraineeTable/TraineeTable';


export class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (name, email, password) => {
    this.setState({ open: false });
    console.log(name, email, password);
  };

  render() {
    const { open, fullWidth, maxWidth } = this.state;

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
        <TraineeTable />
        <div>
          <ul>
            {items}
          </ul>
        </div>
      </div>
    );
  }
}
