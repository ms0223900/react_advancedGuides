import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.todoRef = React.createRef();
    this.state = {};
  }
  componentDidMount = () => {
    this.todoRef.current.focus();
  }
  render() {
    return (
      <tr>
        <td>
          <label>{ this.props.id }</label>
        </td>
        <td>
          <input placeholder="write somethig" ref={this.todoRef}/>
        </td>
        <td>
          <label>{ this.props.createdAt.toTimeString() }</label>
        </td>
      </tr>
    );
  }
}
export default Todo;