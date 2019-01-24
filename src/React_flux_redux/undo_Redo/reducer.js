

function undoable(reducer) {
  const initState = {
    past: [],
    present: null,
    future: [],
  };
  return function (state = initState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        const prev = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        return {
          past: newPast,
          present: prev,
          future: [present, ...future],
        }
      case 'REDO':
        const next = future[0];
        const newFuture = future.slice(1);

        return {
          past: [...newPast, present],
          present: next,
          future: newFuture,
        }
      default:
        const newPresent = reducer(present, action);
        if(present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        }
    }
  }
  
}