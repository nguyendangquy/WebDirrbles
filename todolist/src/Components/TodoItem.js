import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const TodoItem = ({ status, deleteTodo, task, editTodo }) => {
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span className={status === "2" ? "todo-title-completed " : ""}>
          {task}
        </span>
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

export default TodoItem;
