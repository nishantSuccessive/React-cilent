import React from 'react';
import { Field } from '../../components';
import styling from '../../components/textField/style';

class TextFieldDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render(){
    return(

    <div>

      <Field name="Disabled Input" disabled setText="This is disabled input" />
      <Field name="Accessible" setText="Input is accessible" />
      <Field name="101" id="3"  setText="input is having errors"/>
      <Field style={styling.textColor} setText="Could not be greater than"></Field>
    </div>

    )
  }
};
export { TextFieldDemo };
