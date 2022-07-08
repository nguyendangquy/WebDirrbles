import React from "react";
import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
function TodoItem({ job, onEditJob, onDeleteJob }) {
  return (
    <div className="todo-job">
      <div className="todo-item ">
        <CheckOutlined className="icon-check" />
        <span>{job}</span>
      </div>
      <div className="icon-job">
        <EditOutlined className="edit" onClick={onEditJob} />
        <DeleteOutlined className="close" onClick={onDeleteJob} />
      </div>
    </div>
  );
}
export default TodoItem;
