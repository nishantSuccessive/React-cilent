import React from 'react';
import { Field, Slider } from '../../components';
import { styling } from './style';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

class TextFieldDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    const imgArr = [
      `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
      `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
      `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
      `${PUBLIC_IMAGE_FOLDER}js.jpg`,
      `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,
    ];
    return (
      <div>
        <Slider banners={imgArr} random style={styling.imgAlign} />
        <Field
          name="Disabled Input"
          disabled
          setText="This is disabled input"
        />
        <Field name="Accessible" setText="Input is accessible" />
        <Field name="101" id="3" setText="input is having errors" />
        <Field style={styling.textColor} setText="Could not be greater than" />
      </div>
    );
  }
}
export { TextFieldDemo };
