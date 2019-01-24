import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import MyCom1 from './18_strictMode';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, again. {this.props.name} </h1>
    );
  }
}
//props型別檢查
//需為字串：
Greeting.propTypes = {
  name: PropTypes.string, 
}

//範例文檔請參考網站: https://reactjs.org/docs/typechecking-with-proptypes.html
//---------------------------------------------------------------------------------------


// 檢查需有只有一個子元素
class MyComponent1 extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}
MyComponent1.propTypes = {
  children: PropTypes.element.isRequired,
}

//default props: 預設props
class MyComponent2 extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name} </h1>
    );
  }
}

MyComponent2.defaultProps = {
  name: 'Guest',
}






export default Greeting;
export { MyComponent2, MyComponent1 };
