import ReactDOM from 'react-dom';
import $ from 'jquery';


const $id = (id) => document.getElementById(id);



//React Component: 
// ES6
class Greeting extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
//ES5: create-react-class
var createReactClass = require('create-react-class');
var Greeting2 = createReactClass({
  render: function() {
    return <h1>Hello, too.</h1>;
  }
});


//default props:
//ES6
Greeting.defaultProps = {
  name: 'Helen',
}
//ESS5
var Greeting3 = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Peter',
    }
  },
  //相當於this.state
  getInitialState: function() {
    return { count: this.props.initialCount, };
  }
});


//event binding: 
//ES6
class SayHi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return ();
  }
}








// export default PortalApp;
// export { Parent };


