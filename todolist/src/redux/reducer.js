import { v4 } from "uuid";

import * as types from "./actionType";

const initialState = {
  todos: [],
};
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      const addedTodos = [...state.todos, action.payload];

      return {
        ...state,
        todos: addedTodos,
      };
    case types.DELETE_TODO:
      const filterTodo = state.todos.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        todos: filterTodo,
      };
    case types.EDIT_TODO:
      const editedTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.selectedId) {
          return {
            ...todo,
            task: action.payload.task,
            status: action.payload.status,
          };
        }

        return todo;
      });
      return {
        ...state,
        todos: editedTodo,
      };

    default:
      return state;
  }
};
export default todosReducer;
