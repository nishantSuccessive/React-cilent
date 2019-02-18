import React from 'react';
import { TextField } from '../../components';
import styling from '../../components/textField/style';

const TextFieldDemo = () => (
  <>
    <div>
      <h4>This is Disabled Input</h4>
      <TextField name="Disabled Input" disabled />
      <h4>A valid Input</h4>
      <TextField name="Accessible" />
      <h4>An input with error</h4>
      <TextField name="101" id="3" />
      <h4 style={styling.textColor}>Could not be greater than</h4>
    </div>
  </>
);
export { TextFieldDemo };
