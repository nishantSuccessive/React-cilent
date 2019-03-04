import React from 'react';
import * as yup from 'yup';
import {
  NewText, RadioGroup, SelectField, Button,
} from '../../components/index';
import { DropDownValues, Cricket, Football } from '../../configs/constants';
import { styleForButton, styleForTextField } from './style';

const schema = yup.object().shape({
  name: yup.string().required(),
  sport: yup.string().required('sport is required'),
  radio: yup.string().required('select the field'),

});

export class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: { name: '', sport: '', radio: '' },
      radio: '',
      sport: '',
      name: '',
      isTouched: {
        name: false,
        sport: false,
        radio: false,
      },
      hasErrors: {
        name: false,
        sport: false,
        radio: false,
      },
    };
  }

  handleChange = Field => (event) => {
    const { isTouched } = this.state;
    this.setState({
      [Field]: event.target.value,
      isTouched: { ...isTouched, [Field]: true },
    }, this.Validate(Field));
  };

forErrors = () => {
  const { hasErrors, isTouched } = this.state;
  const obj = Object.values(hasErrors);
  const objForTouched = Object.values(isTouched);
  let i;
  for (i = 0; i < obj.length; i += 1) {
    if (obj[i]) return false;
  }
  for (i = 0; i < objForTouched.length; i += 1) {
    if (!objForTouched[i]) return false;
  }
  return true;
}

forblur = (value) => {
  this.Validate(value);
}

Validate = (value) => {
  let isPresent = false;
  const {
    error, name, sport, radio, hasErrors,
  } = this.state;

  schema.validate({ name, sport, radio }, { abortEarly: false })
    .then(() => {
      this.setState({
        error: { ...error, [value]: '' },
        hasErrors: { ...hasErrors, [value]: false },
      });
    })
    .catch((err) => {
      isPresent = true;
      err.inner.forEach((element) => {
        if (element.path === value) {
          this.setState({
            error: { ...error, [value]: element.message },
            hasErrors: { ...hasErrors, [value]: true },
          });
        }
      });
    });
  if (!isPresent) {
    this.setState({
      error: { ...error, [value]: '' },
      hasErrors: { ...hasErrors, [value]: false },

    });
  }
}

render() {
  const {
    name, sport, error, radio,
  } = this.state;
  let result = {};
  if (sport === 'Cricket') {
    result = Cricket;
  }
  if (sport === 'Football') {
    result = Football;
  }
  return (
    <div>
      <h3>Name</h3>
      <NewText
        value={name}
        onChange={this.handleChange('name')}
        style={styleForTextField.base}
        onBlur={() => this.forblur('name')}
        error={error.name || ''}
      />
      <h3>Select Game you paly</h3>
      <SelectField
        options={DropDownValues}
        onChange={this.handleChange('sport')}
        onBlur={() => this.forblur('sport')}
        error={error.sport || ''}
      />
      {sport ? (
        <div>
          <h3>What you do??</h3>
          <RadioGroup
            value={radio}
            options={result}
            onChange={this.handleChange('radio')}
            onBlur={() => this.forblur('radio')}
            error={error.radio || ''}
          />
        </div>
      ) : (
        ''
      )}
      <div style={styleForButton.forDiv}>
        <Button value="Cancel" />
        {(this.forErrors()) ? <Button value="Submit" style={{ backgroundColor: '#20b520', color: 'white' }} /> : <Button value="Submit" disabled />}
      </div>
    </div>
  );
}
}
