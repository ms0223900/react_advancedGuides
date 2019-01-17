import React, { Suspense, lazy, Component } from 'react';
import PropTypes from 'prop-types';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
// import Todo from './Todo';

configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------
const $ = (all) => document.querySelectorAll(all);



class InputPad extends React.Component {
  DIGITAL = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  CATEGORY = ['Food', 'Shopping', 'Other'];

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  
  _onHandleClick = () => {

  }
  render() {
    return (
      <React.Fragment>
        <div className="preview-wrapper">
          <div className="output wrapper">{this.props.output}</div>
          <div className="productType-wrapper wrapper">
            {this.CATEGORY.map(category => (
              <React.Fragment key={category}>
                <input 
                  type="radio" 
                  id={category}
                  className={"categoryRadio"}
                  name="categoryChoice"/>
                <label 
                  className="productPad"
                  id={'cat-' + category}
                  htmlFor={category}
                  onClick={(e) => this.props.onHandleCatInput(category, e)}
                > 
                  {category}
                </label>
              </React.Fragment>
            ))}
          </div>
          <div className="numPad-wrapper wrapper">
            {this.DIGITAL.map(num => (
              <div 
                className="numPad"
                id={'numPad' + num} 
                key={num.toString()}
                //使用箭頭綁定e, 傳num進去
                onClick={(e) => this.props.onHandleNumberInput(num, e)}
              >
                {num}
              </div>
            ))}
          </div>
          <div 
            id="confirm-button"
            onClick={this.props.onHandleConfirm}
          >
            Confirm
          </div>
          <div 
            id="clear-button"
            onClick={this.props.onHandleClear}
          >
            Clear
          </div>
        </div>
      </React.Fragment>
      
    );
  }
}

InputPad.propTypes = {
  output: PropTypes.number,
}


export default InputPad;