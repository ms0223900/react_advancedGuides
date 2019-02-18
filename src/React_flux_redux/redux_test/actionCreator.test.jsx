import { addTodo, todos } from "./actionCreator";
// import { types } from "util";

const actions = {
  addTodo,

}

const ActionTypes = {
  ADD_TODO: 'ADD_TODO',
}


describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'eat dinner';
    const expectedAction = {
      type: ActionTypes.ADD_TODO,
      text,
    }
    console.log(expectedAction);
    expect(actions.addTodo(text)).toEqual(expectedAction);
  });

  it('after addTodo, todos should be have this todo', () => {
    const text = 'todo1';
    const expectedTodos = ['todo1'];
    
    expect( todos([], actions.addTodo(text)) ).toEqual(expectedTodos)
  });
});




