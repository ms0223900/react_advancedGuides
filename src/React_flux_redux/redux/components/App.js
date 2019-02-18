import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList';

const App = ({ match: { params } }) => (
  <div>
    <Footer />
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'SHOW_ALL' }/>
  </div>
);

export default App;