import React, { useState, useRef } from "react";
import TodoItem from "./TodoItem";
import { STATUS_OPTIONS } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../redux/action";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

const TodoList = () => {
  const state = useSelector((state) => ({ ...state.todos }));
  const todoList = state.todos;
  const [selectedId, setSelectedId] = useState();

  const dispatch = useDispatch();

  const inputRef = useRef();
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);

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
          time: new Date().toLocaleString(),
        })
      );
      toast.success("Task Created SuccessFully");
      setTask("");
      inputRef.current.focus();
    }
  };
  const handleEdit = (id) => {
    const todoSelected = state.todos.find((item) => item.id === id);
    setTask(todoSelected.task);
    setStatus(todoSelected.status);
    setIsEdit(true);
    setSelectedId(id);
    inputRef.current.focus();
  };

  const handleChange = () => {
    dispatch(editTodo({ selectedId, task, status }));
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
    <div className="todoList">
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
          onChange={handleAddStatus}
        >
          {STATUS_OPTIONS.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
                    todo={todo}
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
