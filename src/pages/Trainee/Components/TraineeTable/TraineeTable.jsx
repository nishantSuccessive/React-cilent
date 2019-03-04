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
});

class Traineetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  }

  handleClick = property => (event) => {
    const { onSelect } = this.props;
    onSelect(event, property);
  }

  render() {
    const {
      columns, data, orderBy, order,
    } = this.props;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>

          <TableHead>
            <TableRow>
              {
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
                ))
              }

            </TableRow>

          </TableHead>

          <TableBody>
            {data.map(row => (
              <TableRow key={row.id} onClick={this.handleClick(row.id)} className={classes.row} hover>
                {columns.map(column => (
                  <TableCell align={column.align} component="th" scope="row">
                    { (column.format) ? column.format(row[column.field]) : row[column.field]}
                  </TableCell>
                ))
                }
              </TableRow>

            ))}
          </TableBody>
        </Table>
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

};

Traineetable.defaultProps = {
  orderBy: '',
  order: 'asc',
};

export default withStyles(styles)(Traineetable);
