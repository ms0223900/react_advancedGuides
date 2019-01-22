import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import TodoItem from './TodoItem';
configure({ adapter: new Adapter() });

//---------------------------------------------------------------------------------------

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _handleDelete = (id) => {
    const { onDeleteTodo } = this.props;
    onDeleteTodo(id);
    return id;
  }
  _updateTodo = (id, title) => {

  }

  render() {
    const { todoLists, onToggleTodo, onUpdateTodo } = this.props;
    
    return (
      <ul>
        {todoLists.map(ls => (
          <TodoItem 
            key={ls.id}
            id={ls.id}
            title={ls.title}
            completed={ls.completed}
            onDelete={() => this._handleDelete(ls.id)}
            onToggle={() => onToggleTodo(ls.id)}
            onUpdateTodo={(content) => onUpdateTodo(ls.id, content)}  />
        ))}
      </ul>
      
    );
  }
}

TodoList.defaultProps = {
  todoLists: [],
}


export default TodoList;