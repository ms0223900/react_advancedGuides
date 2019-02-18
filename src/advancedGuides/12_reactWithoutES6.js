import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// import {decorate as mixin} from 'react-mixin'


const $id = (id) => document.getElementById(id);



//React Component: 
// ES6
class Greeting extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
//ES5: create-react-class
// var createReactClass = require('create-react-class');
// var Greeting2 = createReactClass({
//   render: function() {
//     return <h1>Hello, too.</h1>;
//   }
// });

//---------------------------------------------------------------------------------------

//default props:
//ES6
Greeting.defaultProps = {
  name: 'Helen',
}
//ESS5
// var Greeting3 = createReactClass({
//   getDefaultProps: function() {
//     return {
//       name: 'Peter',
//     }
//   },
//   //相當於this.state
//   getInitialState: function() {
//     return { count: this.props.initialCount, };
//   }
// });

//---------------------------------------------------------------------------------------

//event binding: 
//ES6
class SayHi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <h1>aa</h1>
    );
  }
}

//---------------------------------------------------------------------------------------

//MIXIN: 
//setInterval mixin sample:
const SetIntervalMixin = {
  componentWillMount() {
    this.intervals = [];
  },
  setInterval() {
    this.intervals = [ ...this.intervals, setInterval.apply(null, arguments)];
  },
  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  }
}

// @mixin(SetIntervalMixin);

class TickTock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };
  }
  mixins = [SetIntervalMixin];

  componentDidMount = () => {
    this.setInterval(this.tick, 1000);
  }
  tick() {
    this.setState((state) => ({seconds: state.seconds + 1}));
  }
  render() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
}





// export default TickTock;
// export { Parent };


