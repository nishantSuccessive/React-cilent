import React from 'react';
import PropTypes from 'prop-types';
import { roundRobin, getRandomInt } from '../../lib/utils/maths';

export class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { random, duration } = this.props;
    this.interval = setInterval(() => {
      const { index } = this.state;
      if (random) {
        this.setState({
          index: roundRobin(5, index),
        });
        return;
      }
      this.setState({
        index: getRandomInt(index),
      });
    }, duration);
  }

  componentWillMount = () => {
    clearInterval(this.interval);
  };

  render() {
    const {
      alt, banners, defaultBanner, height, random, ...rest
    } = this.props;
    const { index } = this.state;
    console.log(banners, index);

    const imgValue = banners ? banners[index] : defaultBanner;
    console.log(imgValue);
    return (
      <div>
        <img src={imgValue} height={height} alt={alt} {...rest} />
      </div>
    );
  }
}

Slider.propTypes = {
  alt: PropTypes.string,
  banners: PropTypes.arrayOf(PropTypes.string),
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};
Slider.defaultProps = {
  alt: 'defaulBanner',
  banners: '',
  defaultBanner: 'banners/default.png',
  duration: 2000,
  height: 200,
  random: false,
};
