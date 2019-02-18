import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//可控制與不可控制元件
// 可控制：將其元件的值變為props/state
class ControlledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ' ', };
  }

  handlChange = (e) => {
    this.setState({
      value: e.target.value, 
    });
  }
  render() {
    return (
      <div>
        <input 
          type="text"
          value={this.state.value}
          onChange={this.handlChange} />
        <p>It can be realtime to take the value.(to upperCase for example)</p>
        <p> { this.state.value.toUpperCase() }</p>
      </div>
    );
  }
}






//---------------------------------------------------------------------------------------

//不可控制：原生ＤＯＭ元件，任憑其值由ＤＯＭ 或是 ref來管控
//default value:
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  handleSubmit = (e) => {
    alert('A name was submitted: ' + this.input.current.value);
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input 
            defaultValue='Peter'
            type="text" 
            ref={this.input} />
        </label>
        <input type="submit" value="Submit it" />
      </form>
    );
  }
}

//file input tag: use ref to get ther file
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const files = this.fileInput.current.files
    console.log(files);
    if(files.length > 0) {
      alert(
        `Selected file : ${
          files[0].name
        }`
      );
    }
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input 
            type="file" 
            ref={this.fileInput} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}








export default NameForm;
export { ControlledForm, FileInput };
