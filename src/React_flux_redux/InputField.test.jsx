import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import InputField from './InputField';

describe('test InputField', () => {
  it('test keydown press which the key is enter', () => {
    let spy = jest.fn();
    const inputField = shallow(<InputField onKeyDown={spy}/>);

    inputField.simulate('keydown');
    expect(spy).toBeCalled();
  });

  it('test handle change, and set the value of state', () => {
    let e = {
      keyCode: 13,
      target: {
        value: 'title',
      } 
    };
    const inputField = shallow(<InputField />);
    inputField.instance()._onhandleChange(e);
    expect(inputField.instance().state.value).toBe('title');
  });
})
