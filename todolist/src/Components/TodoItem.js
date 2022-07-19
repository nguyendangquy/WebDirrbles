import { memo } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TODO_STATUS } from "../constants";

const TodoItem = ({ todo, deleteTodo, editTodo }) => {
  console.log("re-render");
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span
          className={
            Number(todo.status) === TODO_STATUS.DONE
              ? "todo-title-completed "
              : ""
          }
        >
          {todo.task}
        </span>
        <p className="todo-time">{todo.time}</p>
      </div>
      <div className="icon-job">
        <div className="icon-job-button" onClick={editTodo}>
          <EditOutlined className="edit" />
        </div>
        <div className="icon-job-button" onClick={deleteTodo}>
          <DeleteOutlined className="close" />
        </div>
      </div>
    </div>
  );
};

export default memo(TodoItem);
