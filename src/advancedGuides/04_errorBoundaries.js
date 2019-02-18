import React from 'react';
import ReactDOM from 'react-dom';

//Errot Boundaries
// 錯誤範圍：將錯誤輸出，並且不影響其他各組件的行為

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
// 將錯誤範圍包在可能會出錯的元件外
function myErr() {
  return (
    <ErrorBoundary>
      <div></div>
    </ErrorBoundary>
  );
}


//可以在event handler中使用 try catch
class MyAnotherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      value: 0,
    }
  }

  handleClick = () => {
    try {
      this.setState({ value: this.state.value + 1,});
      setTimeout(() => {
        window.alert(this.state.value);
      });
    } catch(err) {
      this.setState({error: err});
    }
  }

  render() {
    if(this.state.error) {
      return <h2>Caught a error: {this.state.error}</h2>
    }
    return <div onClick={this.handleClick}> Click ME! </div>
  }
}

export default MyAnotherComponent;





// export default Context;