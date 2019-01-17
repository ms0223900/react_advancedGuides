import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css';
import App from './App';
import App2 from './testProject/App2';
import App3 from './testProject2/App3'
import './testProject/css/App2.css';
import './testProject2/css/App3.css';
import * as serviceWorker from './serviceWorker';

const $id = (id) => document.getElementById(id);

function sayHello() {
  $('#btn').click(function() {
    alert('Hello');
  })
}
$id('root-button').addEventListener('click', function () {
  if($id('root').style.display === 'none') {
    $id('root').style.display = 'block';
  } else {
    $id('root').style.display = 'none';
  }
})





// ReactDOM.render(<App />, document.getElementById('root'), sayHello);
// ReactDOM.render(<App2 />, document.getElementById('root2'));
ReactDOM.render(<App3 />, document.getElementById('root3'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
