import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputField from './InputField';
//My components here


configure({ adapter: new Adapter() }); 
//---------------------------------------------------------------------------------------

class TodoItem extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      editable: false,
    };
  }

  _toggleEditMode = () => {
    this.setState({
      editable: !this.state.editable,
    })
  }
  _onHandleKeyDown = (e) => {
    if(e.keyCode === 27 || e.keyCode === 13) { //esc
      e.preventDefault();
      this._toggleEditMode();
    }
  }

  renderEditTodo = () => {
    const { title, onUpdateTodo } = this.props;
    return (
      <InputField
        placeholder="edit todo"
        value={title}
        onBlur={this._toggleEditMode}
        onKeyDown={(e) => this._onHandleKeyDown(e)}
        onSubmitEditing={(content) => {
          console.log(content);
          onUpdateTodo(content);
          this._toggleEditMode();
        }} />
    )
  }
  render() {
    const { id, title, completed, onToggle } = this.props;
    
    const viewTodo = (
      <li>
        <input 
          id={id}
          type='checkbox' 
          checked={completed}
          onChange={onToggle} />
        <span 
          className={!completed ? 'notDone' : 'Done'}
          onDoubleClick={this._toggleEditMode}>{title}</span>
        <span 
          style={{display: 'inline-block', width: '20px', }}></span>
        <button 
          onClick={this.props.onDelete}> X </button>
      </li>
    );


    return (
      this.state.editable ? this.renderEditTodo() : viewTodo
    );
  }
}
export default TodoItem;