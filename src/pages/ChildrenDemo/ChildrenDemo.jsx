import React from 'react';
import { Math } from '../../components';


export class ChildrenDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  templateForMath = (first, operator, second, result) => (
    <h4>
      {first}
      {operator}
      {second}
      {'='}
      {result}
    </h4>
  )

  render() {
    return (
      <div>
        <Math
          first={5}
          operator="/"
          second={9}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)
          )
          }
        </Math>
        <Math
          first={5}
          operator="/"
          second={0}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)

          )
          }
        </Math>
        <Math
          first={5}
          operator="+"
          second={9}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)

          )
          }
        </Math>
        <Math
          first={5}
          operator="-"
          second={9}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)

          )
          }
        </Math>
        <Math
          first={5}
          operator="*"
          second={9}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)

          )
          }
        </Math>
        <Math
          first={5}
          operator="^"
          second={9}
        >
          {(first, operator, second, result) => (
            this.templateForMath(first, operator, second, result)

          )
          }
        </Math>
      </div>
    );
  }
}
