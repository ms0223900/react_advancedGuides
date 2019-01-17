import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



export default class CheckboxWithLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: false, };
  }

  _onChange = () => {
    this.setState({ isChecked: !this.state.isChecked, })
  }

  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this._onChange} />
          {this.state.isChecked ? this.props.labelOn : this.props.labelOff }
      </label>
    );
  }
}