import React from 'react';
import ReactDOM from 'react-dom';

//React.Fragment: React提供的虛擬節點，讓子組件組合起來
function Fragment(props) {
  let ls = props.ls;
  return (
    <React.Fragment>
      {props.list.map((ls) => 
        <ListItem0
          num={ls} 
          key={ls.toString()} />
      )}
      {props.list2.map((ls) =>
        <ListItem1
          value={ls.value}
          key={ls.id} />
      )}
    </React.Fragment>
  );
}
function ListItem0(props) {
  return (
    <li>{props.num}</li>
  );
};

function ListItem1(props) {
  return (
    <li>{props.value}</li>
  );
}



export default Fragment;

