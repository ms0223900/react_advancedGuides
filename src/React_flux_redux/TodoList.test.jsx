import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import TodoList from './TodoList';
import TodoItem from './TodoItem';

//---------------------------------------------------------------------------------------
describe('test todolist', () => {
  it('test the click button should get the correct todolist ID', () => {
    let spy = jest.fn((id) => id);
    const todoList = shallow(<TodoList onDeleteTodo={spy}/>);
    const todoItem = shallow(<TodoItem />);

    expect(todoList.instance()._handleDelete(1)).toBe(1);
  });
})
