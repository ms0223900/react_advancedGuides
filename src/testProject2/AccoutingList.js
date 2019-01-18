import React, { Suspense, lazy, Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
//My components here
import edit from './images/edit.png';

configure({ adapter: new Adapter() });
//---------------------------------------------------------------------------------------

function AccountingList(props) {
    const editInput = (value, id) => 
      <input 
        defaultValue={value}
        id={'input' + id}
        onChange={(e) => props.onChangeNumber(e, id)}
        onKeyDown={(e) => props.onKeyDown(e, id)}
        ref={props.inputRef} />;
    return (
      <React.Fragment>
        {props.accountingList.map(ls => (
          <tr key={ls.id}>
            <td>{ls.category}</td>
            <td 
              onDoubleClick={() => props.onHandleEdit(ls.id)}
              id={'price' + ls.id}
            >
              {ls.isEdit ? 
                editInput(ls.price, ls.id) : 
                ('$  ' + ls.price)
              }
            </td>
            <td 
              onClick={() => props.onHandleEdit(ls.id)}>
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





export default AccountingList;