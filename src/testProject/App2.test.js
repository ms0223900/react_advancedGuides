import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import App2 from './App2';
import Todo from "./Todo";

describe('<App2 />', () => {
  const app2 = shallow(<App2 />);

  it('render one default input', () => {
    expect(app2.find(Todo).length).toBe(1);
  });

  it('render two inputs after click the button', () => {
    const instance = app2.instance();
    let spy = jest.spyOn(instance, '_addToStart');
    //強制更新render!!!
    app2.instance().forceUpdate();  
    app2.find('#addStart').simulate('click');
    expect(app2.find(Todo).length).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('sort the todos', () => {
    // arrow function: _sortTodo = () => 是創建instance 而不是 prototype
    const spy = jest.spyOn(app2.instance(), '_sortTodo');
    //強制更新render!!!
    app2.instance().forceUpdate();  
    // 點擊按鈕
    app2.find('button#sort-earliest').simulate('click');
    expect(spy).toHaveBeenCalledWith('Earliest'); 
  })
})




