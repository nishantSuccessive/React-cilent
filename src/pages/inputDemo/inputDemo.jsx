import React from 'react';
import { NewText, RadioGroup, SelectField } from '../../components/index';
import { DropDownValues, cricket, Football } from '../../configs/constants';
import { styleForTextField } from '../../components/newText/style';

export class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', sport: '' };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleValueChange = (event) => {
    this.setState({
      sport: event.target.value,
    });
  };

  render() {
    const { name, sport } = this.state;
    let result;
    if (sport === 'Cricket') {
      result = cricket;
    }
    if (sport === 'Football') {
      result = Football;
    }
    console.log(result);
    return (
      <div>
        <h3>Name</h3>
        <NewText
          value={name}
          onChange={this.handleNameChange}
          style={styleForTextField.base}
        />
        <h3>Select Game you paly</h3>
        <SelectField
          options={DropDownValues}
          onChange={this.handleValueChange}
        />
        {sport ? (
          <div>
            <h3>What you do??</h3>
            <RadioGroup options={result} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
