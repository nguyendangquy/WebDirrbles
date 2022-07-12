import React from "react";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function TodoItem({ jobItem, onEditJob, onDeleteJob }) {
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span
          className={
            Number(jobItem.status) === 2 ? "todo-title-completed " : ""
          }
        >
          {jobItem.name}
        </span>
        <p className="todo-time">{jobItem.time}</p>
      </div>
      <div className="icon-job">
        <div className="icon-job-button" onClick={onEditJob}>
          <EditOutlined className="edit" />
        </div>
        <div className="icon-job-button" onClick={onDeleteJob}>
          <DeleteOutlined className="close" />
        </div>
      </div>
    </div>
  );
}
export default TodoItem;
