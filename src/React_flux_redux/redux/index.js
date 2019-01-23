import { createStore } from "redux";
import { 
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
 } from './actions';
import todoApp from './reducer';
export const store = createStore(todoApp);

console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(toggleTodo(0));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

