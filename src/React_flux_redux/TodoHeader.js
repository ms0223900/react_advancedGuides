import React, { Suspense, lazy, Component, ProviderProps } from 'react';
import PropTypes from 'prop-types';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here


configure({ adapter: new Adapter() }); 
//---------------------------------------------------------------------------------------

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { userName, title, todoCount } = this.props.todoHeader;
    return (
      <React.Fragment>
        <h1> {title} </h1>
        <h2>Hi, {userName} 
          <span> 你還有 {todoCount} 件事情沒做完！</span>
        </h2>
      </React.Fragment>
    );
  }
}
// prop types
TodoHeader.propTypes = {
  userName: PropTypes.string,
  title: PropTypes.string,
  todoCount: PropTypes.number,
}

//default Props
TodoHeader.defaultProps = {
  todoHeader: {
    userName: 'Guest',
    title: 'My TodoList! ',
    todoCount: 0,
  },
}


export default TodoHeader;