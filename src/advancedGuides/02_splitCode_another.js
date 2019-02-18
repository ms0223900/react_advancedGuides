import React from 'react';
import ReactDOM from 'react-dom';

function AnotherCompoent(props) {
  return (
    <div>
      <h3>Another Component~</h3>
    </div>
  );
}

//要用React.lazy 需使用default來輸出
export default AnotherCompoent;
export let aa = 1;
// export default AnotherCompoent;