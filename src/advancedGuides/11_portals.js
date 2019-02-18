import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// portal: 用此API將額外的元件渲染在跳脫目前的DOM層級，使其在別的節點上出現！
// 經常使用在對話框 警示窗...等
// React.createPortal(child, container);
const $id = (id) => document.getElementById(id);





class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    $id('modal-root').appendChild(this.el);
  }
  componentWillUnmount() {
    $id('modal-root').removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

class PortalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, };
  }

  handleToggleShow = () => {
    console.log(this.state.showModal);
    this.setState({ showModal: !this.state.showModal, });
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal" onClick={this.handleToggleShow}>
          <div>
            With a portal, we can render content into a different part of the DOM, as if it were any other react child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleToggleShow}>Hide Modal! </button>
        </div>
      </Modal>
    ) : null;
    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleToggleShow}>Show Modal</button>
        {modal}
      </div>
    );
  }
}
//----------------------------------------------------------
//Event Bubbling: 事件泡泡傳遞，即便不在同一層的網頁ＤＯＭ架構底下，ReactDOM會將其視為同一層，將事件傳遞給上層
// another--modal-root
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: 0, };
  }

  handleClick = () => {
    this.setState(state => ({
      clicked: state.clicked + 1, 
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of Clicks: {this.state.clicked}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child of the div with the onClick handler.
        </p>
        <Modal>
          <div className="modal-button">
            <button>Click</button>
          </div>
        </Modal>
      </div>
    );
  }
}









export default PortalApp;
export { Parent };


