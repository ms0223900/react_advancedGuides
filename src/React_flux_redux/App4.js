import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import InputField from './InputField';

configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------
const onDeleteTodo = (todos, id) => {
  let newTodos = todos.filter(todols => todols.id !== id);
  return newTodos;
}
const onToggleTodo = (todos, id) => {
  let newTodos = todos.map(todo => todo.id === id ? 
    {...todo, completed: !todo.completed } : todo);
  return newTodos;
}
const createTodo = (todos, title) => {
  let addNew = {
    id: todos[todos.length - 1].id + 1,
    title: title,
    completed: false,
  }
  let newTodos = [...todos, addNew];
  return newTodos;
}
const updateTodo = (todos, id, newTitle) => {
  let renewedTodo = todos.map(todo => todo.id === id ? 
    {...todo, title: newTitle} : todo);
  return renewedTodo;
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [{
        id: 1,
        title: 'Item1',
        completed: false,
      },],

    };
  }

  _setNewTodo = (newTodos) => {
    this.setState({
      todoLists: newTodos,
    })
  }
  _onDeleteTodo = (id) => {
    const newTodos = onDeleteTodo(this.state.todoLists, id);
    this._setNewTodo(newTodos);
  }
  _onToggleTodo = (id) => {
    const newTodos = onToggleTodo(this.state.todoLists, id);
    this._setNewTodo(newTodos);
  }
  _createTodo = (title) => {
    const newTodos = createTodo(this.state.todoLists, title);
    this._setNewTodo(newTodos);
  }
  _updateTodo = (id, title) => {
    const newTodos = updateTodo(this.state.todoLists, id, title);
    this._setNewTodo(newTodos);
  }
  
  render() {
    const todos = this.state.todoLists;
    const todoCount = todos.filter(ls => !ls.completed).length;
    const todoHeader = {
      userName: this.state.userName,
      title: this.state.title,
      todoCount: todoCount,
    }

    return (
      <div>
        <h2>TodoList!</h2>
        <TodoHeader todoHeader={todoHeader}/>
        <InputField
          placeholder="add new todo!"
          onSubmitEditing={(title) => this._createTodo(title)} />
        <TodoList 
          todoLists={todos}
          onDeleteTodo={(id) => this._onDeleteTodo(id)}
          onToggleTodo={(id) => this._onToggleTodo(id)}
          onUpdateTodo={(id, title) => this._updateTodo(id, title)} />
      </div>
    );
  }
};

// store.dispatch({ type: 'INCREMENT', });
// store.dispatch({ type: 'INCREMENT', });

// store.dispatch({ type: 'DECREMENT', });



export default TodoApp;
// 
