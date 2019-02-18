import { todos, action as types } from './reducerTest';

 describe('todos reducer', () => {
    it('should return the default state', () => {
      expect(todos(undefined, {})).toEqual([
        {
          text: 'Use Redux!',
          completed: false,
          id: 0,
        },
      ]);
    });

    it('should handle ADD_TODO', () => {
      expect(todos([], {
        type: types.ADD_TODO,
        text: 'Run the tests.'
      })).toEqual([
        {
          text: 'Run the tests.',
          completed: false,
          id: 0,
        }
      ]);

      expect(todos([
        {
          text: 'Run the tests.1',
          completed: false,
          id: 0,
        }
      ], {
        type: types.ADD_TODO,
        text: 'Use Redux.'
      })).toEqual([
        {
          text: 'Use Redux.',
          completed: false,
          id: 1,
        },
        {
          text: 'Run the tests.1',
          completed: false,
          id: 0,
        },
        
      ]);
    });

    
 })
 