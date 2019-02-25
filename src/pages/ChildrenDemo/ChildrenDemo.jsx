import React from 'react';
import { Math } from '../../components';


export class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  render() {
    return (
      <div>
        <Math
          first={5}
          operator="/"
          second={9}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
        <Math
          first={5}
          operator="/"
          second={0}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
        <Math
          first={5}
          operator="+"
          second={9}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
        <Math
          first={5}
          operator="-"
          second={9}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
        <Math
          first={5}
          operator="*"
          second={9}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
        <Math
          first={5}
          operator="^"
          second={9}
        >
          {(first, operator, second, result) => (
            <h4>
              {first}
              {operator}
              {second}
              {'='}
              {result}
            </h4>
          )
          }
        </Math>
      </div>
    );
  }
}
