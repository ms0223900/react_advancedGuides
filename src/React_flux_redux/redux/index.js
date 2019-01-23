import React from 'react';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import todoApp from './reducer';
import App from './components/App';

const store = createStore(todoApp);
const App5 = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default App5;