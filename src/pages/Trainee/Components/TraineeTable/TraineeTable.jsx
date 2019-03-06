import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
  forColumn: {
    padding: 5,
    display: 'flex',
  },
});

class Traineetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleChange = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  }

  handleClick = property => (event) => {
    const { onSelect } = this.props;
    onSelect(event, property);
  }

renderForTableHead = () => {
  const {
    columns, orderBy, order,
  } = this.props;
  return (
    columns.map(element => (

      <TableCell
        align={element.align}
        sortDirection={orderBy === element.field ? order : false}
      >
        <TableSortLabel
          active={orderBy === element.field}
          direction={order}
          onClick={this.handleChange(element.field)}
        >
          {element.label}

        </TableSortLabel>

      </TableCell>
    )));
}

renderForTableBody = () => {
  const {
    columns, data, actions, classes,
  } = this.props;
  return (
    data.map(row => (
      <TableRow key={row.id} className={classes.row} hover>
        {columns.map(column => (
          <TableCell align={column.align} onClick={this.handleClick(row.id)} component="th" scope="row">
            { (column.format) ? column.format(row[column.field]) : row[column.field]}

          </TableCell>
        ))
        }
        <TableCell component="th" scope="row">

          { actions.map(option => (
            <>
              <IconButton aria-label="Delete" className={classes.forColumn} onClick={event => option.handle(event, row)}>

                { option.icon }
              </IconButton>
            </>

          ))}

        </TableCell>

      </TableRow>

    )));
}

render() {
  const {
    classes, rowsPerPage, page, count, onChangePage,
  } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {this.renderForTableHead()}
            <TableCell />
          </TableRow>

        </TableHead>

        <TableBody>
          {this.renderForTableBody()}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}
}
Traineetable.propTypes = {
  classes: PropTypes.node.isRequired,
  columns: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

Traineetable.defaultProps = {
  orderBy: '',
  order: 'asc',
  actions: [],
  page: 0,
  count: 0,
  rowsPerPage: 100,
};

export default withStyles(styles)(Traineetable);
