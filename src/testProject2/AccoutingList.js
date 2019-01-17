import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import edit from './images/edit.png';

configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------

class AccountingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    const editInput = (value) => 
      <input 
        defaultValue={value}
        onChange={this.props.onChangeNumber} />;
    return (
      <React.Fragment>
        {this.props.accountingList.map(ls => (
          <tr key={ls.id}>
            <td>{ls.category}</td>
            <td>
              {this.props.isEdit ? 
                editInput(ls.price) : 
                ('NTD' + ls.price)
                }
            </td>
            <td 
              onClick={(e) => this.props.onHandleEdit(ls.id, e)}>
              <img 
                src={edit} 
                alt="edit" 
                title="edit price"/>
            </td>
          </tr>
        ))}
      </React.Fragment>
    );
  }
}





export default AccountingList;