import * as types from "./actionType";

export const addTodo = (todo) => ({
  type: types.ADD_TODO,
  payload: todo,
});

export const deleteTodo = (todo) => ({
  type: types.DELETE_TODO,
  payload: todo,
});
export const editTodo = (todo) => ({
  type: types.EDIT_TODO,
  payload: todo,
});
