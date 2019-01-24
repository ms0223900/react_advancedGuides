const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
}


function makeAction(type, ...argNames) {
  return function (...args) { 
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action; 
  }
}


const addTodo = makeAction('ADD_TODO', 'text');


function createReducer(initState, handlers) {
  return function reducer(state = initState, action) {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
    
  }
}
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO]: (state, action) => {
    
    const text = action.text.trim();
    return [...state, text];
  }
})

export default makeAction;
export { addTodo, createReducer };
