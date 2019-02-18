import React from 'react';
import ReactDOM from 'react-dom';

class MyErrBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErr: false, };
  }
  
  static getDerivedStateFromErrot(err) {
    return { hasErr: true, };
  }
  
  componentDidCatch(err, info) {
    // logErrorToMyService(err, info);
  }
  
  render() {
    if(this.state.hasErr) {
      return (
        <div>
          <h3>很抱歉，網站正在施工中~</h3>
        </div>
      );
    }
    return this.props.children; //正常則顯示其子內容
  }
  
}

//要用React.lazy 需使用default來輸出
export default MyErrBoundary;
// export default AnotherCompoent;