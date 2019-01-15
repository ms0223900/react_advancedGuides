import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// import {decorate as mixin} from 'react-mixin'


const $id = (id) => document.getElementById(id);

//noJSX
class Hello extends React.Component {
  render() {
    return (
      React.createElement('div', null, `Hello ${this.props.toWho}`)
    );
  }
}
//JSX
class Hello2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>Hello ${this.props.toWho}</div>
    );
  }
}

export default Hello;
export { Hello2 };


