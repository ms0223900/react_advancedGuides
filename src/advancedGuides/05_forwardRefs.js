import React from 'react';
import ReactDOM from 'react-dom';

//使用React.createRef() 創建參考
const GoodButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="goodButton">
    {props.children}
  </button>
));

const ref = React.createRef();
(() => {return <GoodButton ref={ref}>Click Me!</GoodButton>})();


// export default MyAnotherComponent;

