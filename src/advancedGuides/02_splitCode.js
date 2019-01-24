import React from 'react';
import ReactDOM from 'react-dom';

function Code() {
  console.log('a');
  return 'a';
}
export { Code } ;

//React.lazy()
function OtherComponent(props) {
  return (
    <div>
      <h2>HI!!</h2>
    </div>
  );
}


//要用React.lazy 需使用default來輸出
export default OtherComponent;
// export default AnotherCompoent;