import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//web components
//與web components結合
// web component in react
// class HelloMes extends React.Component {
//   render() {
//     return (
//       <div>Hello<x-search>{this.props.name</x-search>!</div>
//     );
//   }
// }


// react in web component
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);





// export default NameForm;
// export { ControlledForm, FileInput };
