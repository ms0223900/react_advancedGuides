import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import TodoItem from './TodoItem';


//---------------------------------------------------------------------------------------
describe('test todoItem', () => {
  it('it should be one todolist at default', () => {
    const todoItem = shallow(<TodoItem />);
    expect(todoItem.find('li')).toHaveLength(1);
  });

  it('click the delete button, it should call the delete function', () => {
    let spy = jest.fn();
    const todoItem = shallow(<TodoItem onDelete={spy}/>);

    todoItem.find('button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  
})
