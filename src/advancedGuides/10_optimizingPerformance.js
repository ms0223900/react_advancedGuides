import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//shouldComponentUpdate, 來根據值的判斷來決定是否更新，以優化性能
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.color !== nextProps.color) {
      return true;
    }
    if(this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
  onHandleClick = () => this.setState(state => ({count: state.count + 1}));
  render() {
    return (
      <button 
        color={this.props.color}
        onClick={this.onHandleClick}>
      Count: {this.state.count}
      </button>
    );
  }
}



class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }
  shouldComponentUpdate(nextState) {
    if(this.state.words !== nextState.words) {
      return true;
    }
  }
  handleClick() {
    // This section is bad style and causes a bug
    //therefore use immutable data structure
    const words = this.state.words;
    this.setState({words: [...words, 'aaaab']});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

export default CounterButton;
export { WordAdder };


