import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import InputPad from './InputPad';
import AccoutingList from './AccoutingList';

configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------

const $ = (all) => document.querySelectorAll(all);


class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = null;
    this.state = {
      number: 0,
      category: '',
      counter: 0, 
      accountingList: [],
    };
  }

  _onFocus = () => {
    if(this.inputRef) {
      this.inputRef.focus();
    }
  }
  _onHandleEdit = (id) => {
    console.log(id);
    // this.setState({
    //   accountingList: [
    //     ...this.state.accountingList, 
    //     {
    //       id: id,
    //       isEdit: true, 
    //     }
    //   ], 
    // });
    this._onFocus();
    const newAccLs = this.state.accountingList.map(
      acc => acc.id === id ? {...acc, isEdit: !acc.isEdit} : acc);
    this.setState({
      accountingList: newAccLs,
    });
  }
  _onKeyDown = (e, id) => {
    if(e.keyCode === 13 || e.keyCode === 27) {
      this._onHandleEdit(id);
    }
  }
  _onChangeNumber = (e, id) => {
    console.log(e.target.value);
    console.log(e.keyCode);
    const newAccLs = this.state.accountingList.map(
      acc => acc.id === id ? {...acc, price: (e.target.value) * 1} : acc);
    this.setState({
      accountingList: newAccLs,
    });
    
  }
  _onHandleNumberInput = (num) => {
    console.log(num);
    if(this.state.number < 1000000) {
      this.setState({
        number: 
          (this.state.number + num.toString()) * 1,
      });
    }
  }
  _onHandleCatInput = (cat) => {
    this.setState({
      category: cat, 
    })
  }
  _onHandleConfirm = () => {
    this.setState(state => ({
      accountingList: [...this.state.accountingList, {
        id: state.counter + 1,
        category: state.category || 'Food',
        price: state.number, 
        isEdit: false,
      }],
      number: 0,
      counter: ++state.counter,
    }))
  }
  _onHandleClear = () => {
    this.setState({ number: 0, })
  }
  componentDidMount = () => {
    // $('input')[0].setAttribute('checked', true); //測試會出錯
  }

  render() {
    return (
      <React.Fragment>
        <h1>App3--Accouting</h1>
        <hr />
        <h2> 1 / 17</h2>
        <h2>Today you cost: 
          <span id="total">
            {this.state.accountingList
              .map(a => a.price)
              .reduce(((a=0, b=0) => a + b), 0)}
          </span>
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Product Type</th>
              <th colSpan="2">Price</th>
            </tr>
            <AccoutingList 
              accountingList={this.state.accountingList}
              onHandleEdit={this._onHandleEdit}
              isEdit={this.state.accountingList.isEdit}
              onChangeNumber={this._onChangeNumber}
              onKeyDown={this._onKeyDown}
              inputRef={el => this.inputRef = el} />
          </tbody>
        </table>
        <InputPad
          output={this.state.number} 
          onHandleNumberInput={this._onHandleNumberInput}
          onHandleCatInput={this._onHandleCatInput}
          onHandleConfirm={this._onHandleConfirm}
          onHandleClear={this._onHandleClear}/>
      </React.Fragment>
      
    );
  }
}





export default App3;