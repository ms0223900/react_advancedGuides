import React, { Suspense, lazy, Component } from 'react';
import { shallow, mount, render } from 'enzyme';
//My components here
import App3 from './App3';
import InputPad from './InputPad';
import AccountingList from './AccoutingList';

//---------------------------------------------------------------------------------------

describe('test InputPad.js', () => {
  it('click a input to call the function', () => {
    let spy = jest.fn();
    const inputPad = shallow(<InputPad onHandleNumberInput={spy}/>);

    inputPad.find('#numPad7').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('it is ten digitals in number input', () => {
    const inputPad = shallow(<InputPad />);
    //要用instance來取得實例，以得到內部值，跟方法一樣的作法
    expect(inputPad.instance().DIGITAL).toHaveLength(10);
  });

  it('it is 3 categories in categories', () => {
    const inputPad = shallow(<InputPad />);
    //要用instance來取得實例，以得到內部值，跟方法一樣的作法
    expect(inputPad.instance().CATEGORY).toHaveLength(3);
  });

  it('click a category to call the click function', () => {
    let spy = jest.fn();
    const inputPad = shallow(<InputPad onHandleCatInput={spy}/>);

    inputPad.find('#cat-Food').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('click a confirm button to call the click function', () => {
    let spy = jest.fn();
    const inputPad = shallow(<InputPad onHandleConfirm={spy}/>);

    inputPad.find('#confirm-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('click a clear button to call the click function', () => {
    let spy = jest.fn();
    const inputPad = shallow(<InputPad onHandleClear={spy}/>);

    inputPad.find('#clear-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('after click confirm and change the state of app3, it will be add a acounting list', () => {
    const accList = [{
      id: 1,
      category: 'Food',
      isEdit: false, 
      price: 2,
    }];
    const accountingList = shallow(<AccountingList accountingList={accList} />);
    expect(accountingList.find('#price1').length).toBe(1);
  });

  it('if the edit is true, the list will change into a input', () => {
    let spy = jest.fn();
    const accList = [{
      id: 1,
      category: 'Food',
      isEdit: true, 
      price: 2,
    }];
    const accountingList = shallow(<AccountingList accountingList={accList} />);
    expect(accountingList.find('#input1')).toHaveLength(1);
  });

  it('double click call function correctly', () => {
    let spy = jest.fn();
    const accList = [{
      id: 1,
      category: 'Food',
      isEdit: false, 
      price: 2,
    }];
    const accountingList = shallow(
      <AccountingList 
        accountingList={accList} 
        onHandleEdit={spy} />);

    accountingList.find('#price1').simulate('doubleclick');
    expect(spy).toHaveBeenCalled();
  });
});

//---------------------------------------------------------------------------------------

describe('test App3', () => {
  it('today title will be  match date format: yyyy-mm-dd', () => {
    const app3 = shallow(<App3 />);
    const date_regExp = new RegExp(/([12]\d{3})[-](0[1-9]|1[0-2]|\d)[-](0[1-9]|[12]\d|3[01])/);
    expect(app3.find('#today-title').text()).toMatch(date_regExp);
  });
  it('test "clear" function and set the number of state to zero.', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleClear();
    expect(app3.state('number')).toBe(0);
  });

  it('test number input to set the state of number correctly.', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleNumberInput(2);
    app3.instance()._onHandleNumberInput(1);
    expect(app3.state('number')).toBe(21);
  });

  it('test category input to set the state of category correctly', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleCatInput('Food');
    expect(app3.state('category')).toBe('Food');
  });

  it('click the confirm button to add a list of accouting', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleCatInput('Food');
    app3.instance()._onHandleNumberInput(2);
    app3.instance()._onHandleConfirm();
    
    expect(app3.state('accountingList')).toEqual([{
      id: 1,
      category: 'Food',
      isEdit: false, 
      price: 2,
    }]);
  });

  it('sum the total price', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleCatInput('Food');
    app3.instance()._onHandleNumberInput(2);
    app3.instance()._onHandleConfirm();
    app3.instance()._onHandleCatInput('Food');
    app3.instance()._onHandleNumberInput(1);
    app3.instance()._onHandleConfirm();

    expect(app3.find('#total').text()).toBe('3');
  });

  it('edit the list, its state should be editable', () => {
    const app3 = shallow(<App3 />);
    app3.instance()._onHandleCatInput('Food');
    app3.instance()._onHandleNumberInput(2);
    app3.instance()._onHandleConfirm();

    app3.instance()._onHandleEdit(1);
    expect(app3.state('accountingList')).toEqual([{
      id: 1,
      category: 'Food',
      isEdit: true, 
      price: 2,
    }]);
  });

})


  
// const app3 = shallow(<App3 />);
    // let spy = jest.spyOn(instance, '_onHandleNumberInput');
    // let spy = jest.spyOn(inputPad.props('onHandleNumberInput'));

    // instance.forceUpdate(); 
    
    
    // instance.forceUpdate(); 
    // inputPad.instance().forceUpdate();
    // expect(spy).toHaveBeenCalled();
    // expect(inputPad.find('#numPad7')).toHaveLength(1);
    // expect(instance.state.number).toBe(7);





// export default App3;