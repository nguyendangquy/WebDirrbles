import React, { useState } from "react";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function TodoItem({ jobitem, onEditJob, onDeleteJob }) {
  return (
    <div className="todo-job">
      <div className="todo-item">
        <span className={jobitem.status == 2 ? "todo-title-completed " : ""}>
          {jobitem.name}
        </span>
        <p className="todo-time">{jobitem.time}</p>
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
