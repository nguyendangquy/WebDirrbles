import { memo } from "react";
import PropTypes from "prop-types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TODO_STATUS } from "../constants";

const TodoItem = ({ todo, deleteTodo, editTodo }) => {
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span
          className={
            todo.status === TODO_STATUS.DONE ? "todo-title-completed " : ""
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
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    status: PropTypes.number,
  }),
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
export default memo(TodoItem);
