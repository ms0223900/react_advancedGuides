import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


const $id = (id) => document.getElementById(id);

//refAPI
//React.createRef()
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {};
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text button"
          onClick={this.focusTextInput} />
      </div>
    );
  }
}




//.current, only class can do this
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {};
  }

  componentDidMount = () => {
    this.textInput.current.focusTextInput();
  }
  
  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}



//---------------------------------------------------------------------------------------

//callback ref:
// React will call the ref callback with the DOM element when the component mounts, and call it with null when it unmounts. Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
class CustomTextInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.state = {};
  }

  setTextInputRef = el => {
    this.textInput = el;
  }
  focusTextInput = () => {
    // console.log(this.textInput);
    if(this.textInput) {
      this.textInput.focus();
    }
  }

  componentDidMount = () => {
    this.focusTextInput();
  }
  
  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="number"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

//pass input as props

function CustomTextInput3(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput3
        inputRef={el => this.inputElement = el}
      />
    );
  }
}





export default AutoFocusTextInput;
export { CustomTextInput2,  };

