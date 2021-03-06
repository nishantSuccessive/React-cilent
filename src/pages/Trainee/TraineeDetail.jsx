import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {
  Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { trainees } from './data';


const styles = theme => ({
  card: {
    display: 'flex',
    margin: '50px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  forLink: {
    textDecoration: 'none',
  },
  forDiv: {
    textAlign: 'Center',
  },
  forButton: {
    backgroundColor: 'lightgray',
    color: 'black',
  },
});

class TraineeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDateFormatted = (value) => {
    const formattedDate = moment(value).format('dddd, MMMM Do YYYY, h:mm:ss ');
    return formattedDate;
  }

  render() {
    const { classes, match } = this.props;
    const { params } = match;
    let Name;
    let Email;
    let newDate;
    trainees.forEach((element) => {
      if (element.id === params.id) {
        Name = element.name;
        Email = element.email;
        newDate = this.getDateFormatted(element.createdAt);
      }
    });
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
          />
          <div className={classes.details}>

            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {Name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {newDate}
              </Typography>
              <Typography component="h5" variant="h5">
                {Email}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <div className={classes.forDiv}>
          <Link to="/trainee" className={classes.forLink}>
            <Button className={classes.forButton}>
                Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
TraineeDetail.propTypes = {
  classes: PropTypes.node.isRequired,
  match: PropTypes.arrayOf.isRequired,
};

export default withStyles(styles, { withTheme: true })(TraineeDetail);
