import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import shime from "./shime1.png";


const $id = (id) => document.getElementById(id);

// 使用在props中的function來分享React component元件 
//提高元件的重複使用，或是一些交叉用途
// provide a render prop that <Mouse> can use to dynamically determine what it renders


class MouseMove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX - $id('mouseArea').offsetLeft,
      y: e.pageY - $id('mouseArea').offsetTop
    });
  }

  render() {
    
    //---------------------------------------------------------------------------------------
    return (
      <div 
        style={{
          width: '100%', 
          height: '200px',
          position: 'relative',
           }} 
        onMouseMove={this.handleMouseMove}
        id="mouseArea">
        <p>The current mouse position is ({this.state.x}, {this.state.y}) </p>
        {this.props.render(this.state)}
      </div>
    );
  }
}
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img 
        src={shime} 
        alt="cat"
        style={{
          position: 'absolute',
          left: mouse.x,
          top: mouse.y,
        }} />
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move your mouse here.</h1>
        <MouseMove render={ mouse => ( <Cat mouse={mouse} /> )}/>
      </div>
    );
  }
}



export default MouseTracker;
// export { CustomTextInput2,  };
