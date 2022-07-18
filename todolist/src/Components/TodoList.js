import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { TODO_STATUS } from "../constants";
import "react-toastify/dist/ReactToastify.css";
// import TodoInput from "./TodoInput";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";

import { CSSTransition } from "react-transition-group";
import { addTodo, deleteTodo, editTodo } from "../redux/action";
import { v4 } from "uuid";

const TodoList = () => {
  const state = useSelector((state) => ({ ...state.todos }));
  const [curentID, setCurentID] = useState();

  const todoList = state.todos;
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const STATUS_OPTIONS = [
    { value: TODO_STATUS.TODO, label: "incomplete" },
    { value: TODO_STATUS.DONE, label: "completed" },
  ];

  const [status, setStatus] = useState(STATUS_OPTIONS[0].value);
  const handleAdd = () => {
    if (!task) {
      toast.error("Missing title Todo!");
      inputRef.current.focus();
    } else {
      dispatch(
        addTodo({
          id: v4(),
          task,
          status,
        })
      );
      toast.success("Task Created SuccessFully");
      setTask("");
      inputRef.current.focus();
    }
  };
  const handleEdit = (id) => {
    const todos = state.todos.find((item) => item.id === id);
    setTask(todos.task);
    setStatus(todos.status);
    setIsEdit(true);
    setCurentID(id);
    inputRef.current.focus();
  };

  const handleChange = () => {
    dispatch(editTodo({ curentID, task, status }));
    setIsEdit(false);
    toast.success("Task Edited SuccessFully");
    setTask("");
    inputRef.current.focus();
  };
  const handleAddStatus = (e) => {
    setStatus(e.target.value);
    inputRef.current.focus();
  };
  return (
    <div className="TodoList">
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          placeholder="Title..."
          ref={inputRef}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) =>
            (e.keyCode === 13 && !isEdit && handleAdd()) ||
            (e.keyCode === 13 && isEdit && handleChange())
          }
        />
        {isEdit ? (
          <span className="editBtn" onClick={handleChange}>
            Update
          </span>
        ) : (
          <span className="addBtn" onClick={handleAdd}>
            Add
          </span>
        )}
        <select
          id="status"
          className="select-status"
          value={status}
          onChange={(e) => handleAddStatus(e)}
        >
          {STATUS_OPTIONS.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <ul className="todo-content">
        {!todoList.length
          ? "There are no jobs on the to-do list"
          : todoList.map((todo) => {
              return (
                <CSSTransition key={todo.id} timeout={500}>
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    task={todo.task}
                    status={todo.status}
                    deleteTodo={() => dispatch(deleteTodo(todo))}
                    editTodo={() => handleEdit(todo.id)}
                    updateTodo={handleChange}
                  />
                </CSSTransition>
              );
            })}
      </ul>
    </div>
  );
};

export default TodoList;
