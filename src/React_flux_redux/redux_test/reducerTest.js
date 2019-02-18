// import { ADD_TODO } from './ActionTypes';
import { createReducer } from './actionCreator'

export const action = {
  ADD_TODO: 'ADD_TODO',
};

const initState = [
  {
    text: 'Use Redux!',
    completed: false,
    id: 0,
  },
];

export const todos = createReducer(initState, {
  [action.ADD_TODO]: (state, action) => {
    const newState = {
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text,
     };
     return [newState, ...state];
  }
})