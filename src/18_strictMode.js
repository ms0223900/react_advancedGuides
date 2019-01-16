import React from 'react';
import ReactDOM from 'react-dom';


const $id = (id) => document.getElementById(id);
// 嚴格模式：<React.strictMode> </React.strictMode>

//Identify unsafe lifecycles

//warning about legacy string ref API usage
//recommend to use "callback" ref
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class MyCom2 extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = null;
  }

  focusInput = () => {
    this.inputElement.focus();
    // 不能再focus前加上current
  }

  componentDidMount = () => {
    this.focusInput();
  }
  
  render() {
    return (
      <React.Fragment>
      <CustomTextInput
        inputRef={el => this.inputElement = el} />
      <button onClick={this.focusInput}>Focus Me!</button>
      </React.Fragment>
    );
  }
}


//instead of using string ref
class MyCom1 extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.inputRef = React.createRef();
  }
  componentDidMount = () => {
    this.inputRef.current.focus();
  }
  
  render() {
    return (
      <input type="text" ref={this.inputRef} />
    );
  }
}


//---------------------------------------------------------------------------------------

//warning about deprecated findDOMnode usage
class MyCom3 extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  
  render() {
    const style = {
      backgroundColor: '#aaa',
    };
    return <div style={style} ref={this.wrapper}> {this.props.children} </div>;
  }
}


//---------------------------------------------------------------------------------------

//偵測副作用？
//Detecting legacy context API

export default MyCom1;
export { MyCom2, MyCom3 };
