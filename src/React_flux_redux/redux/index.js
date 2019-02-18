import React from 'react';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import todoApp from './reducer';
import Root from './components/Root';

const store = createStore(todoApp);

const App5 = () => (
  <Root store={store} />
)

export default App5;