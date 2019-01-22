import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import App4 from './App4';


//---------------------------------------------------------------------------------------


describe('test App4', () => {
  it('test delete todo', () => {
    const app4 = shallow(<App4 />);
    app4.instance()._onDeleteTodo(1);

    expect(app4.instance().state.todoLists).toHaveLength(0);
  });

  
})
