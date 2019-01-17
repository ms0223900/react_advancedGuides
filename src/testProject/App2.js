import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import Todo from './Todo';

configure({ adapter: new Adapter() });




class App2 extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    const todoCounter = 1;
    this.todoRef = React.createRef();
    this.state = {
      list: [
        {
          id: todoCounter,
          createdAt: date,
        }
      ],
      counter: todoCounter,
    };
  }

  _sortTodo = (s) => {
    let sortedList;
    if(s === 'Latest') {
      sortedList = this.state.list.sort((a, b) => ( 
        b.createdAt - a.createdAt
      ));
    } else if(s === 'Earliest'){
      sortedList = this.state.list.sort((a, b) => ( 
        a.createdAt - b.createdAt
      ));
    }
    this.setState({ list: [...sortedList]});
  }
  
  _addToStart = () => {
    this.setState({
      counter: this.state.counter + 1,
      list: [{
        id: this.state.counter + 1,
        createdAt: new Date(),
      }, ...this.state.list]
    });
    // this._handleFocus();
  }
  _addToEnd = () => {
    this.setState({
      counter: this.state.counter + 1,
      list: [...this.state.list, {
        id: this.state.counter + 1,
        createdAt: new Date(),
      }]
    });
    // this._handleFocus();
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="App2-title">Hi</h1>
        <button id="addStart"
          onClick={this._addToStart}
        >
          Add todo to start
        </button>
        <button id="addEnd"
          onClick={this._addToEnd}
        >
          Add todo to end
        </button>
        <span>Sort Todos</span>
        <button 
          id="sort-latest"
          onClick={this._sortTodo.bind(this, 'Latest')}>
            Sort by Latest
          </button>
        <button 
          id="sort-earliest"
          onClick={this._sortTodo.bind(this, 'Earliest')}>
            Sort by Earliest
          </button>
        <div>
          <table>
            <tr>
              <th>ID=key</th>
              <th />
              <th>created at 創建於</th>
            </tr>
            {this.state.list.map((ls, index) => (
              <Todo key={ls.id} ref={this.todoRef} {...ls} />
            ))}
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default App2;
