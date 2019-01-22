import React, { Suspense, lazy, Component } from 'react';
import PropTypes from 'prop-types';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here


configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  _onhandleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  _onhandleKeyDown = (e) => {
    console.log(e.keyCode);
    const { onKeyDown, onSubmitEditing } = this.props;
    const { value } = this.state;
    if(e.keyCode === 13) {
      if(value.trim()) {
        onSubmitEditing(this.state.value); 
      }
      this.setState({
        value: '',
      });
    }
    onKeyDown && onKeyDown(e); //pass it to upper layer, and it have to check the prop onKeyDown is not undefined
  }

  render() {
    return (
      <input
        {...this.props} //must be front of other property
        type="text"
        value={this.state.value}
        onChange={this._onhandleChange}
        onKeyDown={this._onhandleKeyDown}
         />
    );
  }
}
InputField.propTypes = {
  onSubmitEditing: PropTypes.func,
}


export default InputField;