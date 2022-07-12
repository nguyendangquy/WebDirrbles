import { useRef, useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import TodoItem from "./Components/TodoItem";

import { ToastContainer, toast } from "react-toastify";
import { optionStatus, TODO_STATUS } from "./constants";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const inputRef = useRef();
  const [job, setJob] = useState("");

  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")) || job;
    return storageJobs;
  });
  const [curentID, setCurentID] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const STATUS_OPTIONS = [
    { value: TODO_STATUS.TODO, label: "incomplete" },
    { value: TODO_STATUS.DONE, label: "completed" },
  ];
  const [status, setStatus] = useState(STATUS_OPTIONS.label);

  const handleAdd = () => {
    if (!job) {
      toast.error("Missing title Todo!");
      inputRef.current.focus();
    } else {
      const jobItem = {
        id: v4(),
        name: job,
        status,
        time: new Date().toLocaleString(),
      };
      setJobs((prev) => {
        const newJobs = [jobItem, ...prev];
        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem("jobs", jsonJobs);
        return newJobs;
      });

      toast.success("Task Added Successfully ");
      setJob("");
      inputRef.current.focus();
    }
  };
  const handleDelete = (id) => {
    setJobs((prev) => {
      const newJobs = prev.filter((item) => id !== item.id);
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };
  const handleChange = () => {
    setJobs((prevJob) => {
      if (job.length > 0) {
        const todoJob = prevJob.find((item) => item.id === curentID);
        todoJob.name = job;
        todoJob.status = status;
        localStorage.setItem("jobs", JSON.stringify(prevJob));
      }
      return prevJob;
    });
    setIsEdit(false);
    toast.success("Task Updated Successfully");
    setJob("");
    inputRef.current.focus();
  };
  const handleEdit = (id) => {
    const todo = jobs.find((item) => item.id === id);
    setJob(todo.name);
    setStatus(todo.status);
    setCurentID(id);
    setIsEdit(true);
    inputRef.current.focus();
  };
  const handleAddStatus = (e) => {
    setStatus(e.target.value);
    inputRef.current.focus();
  };
  return (
    <>
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          placeholder="Title..."
          ref={inputRef}
          value={job}
          onChange={(e) => setJob(e.target.value)}
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
          {optionStatus.map((item) => (
            <option value={item.id} key={item.id}>
              {item.title}
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
      <div className="todo-content">
        {!jobs.length
          ? "There are no jobs on the to-do list"
          : jobs.map((job) => {
              return (
                <TodoItem
                  key={job.id}
                  jobItem={job}
                  job={job.name}
                  onDeleteJob={() => handleDelete(job.id)}
                  onEditJob={() => handleEdit(job.id)}
                />
              );
            })}
      </div>
    </>
  );
}

export default App;
