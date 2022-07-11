import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./Components/TodoItem";

import { ToastContainer, toast } from "react-toastify";
import { optionStatus } from "./constants";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const inputRef = useRef();
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")) || job;
    return storageJobs;
  });
  const [id, setID] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState("incomplete");

  const handleAdd = () => {
    if (!job) {
      toast.error("Missing title Todo!");
      inputRef.current.focus();
    } else {
      const jobitem = {
        name: job,
        status: status,
        time: new Date().toLocaleString(),
      };

      setJobs((prev) => {
        const newJobs = [jobitem, ...prev];
        const jsonJobs = JSON.stringify(newJobs);
        localStorage.setItem("jobs", jsonJobs);
        return newJobs;
      });

      toast.success("Task Added Successfully ");
      setJob("");
      inputRef.current.focus();
    }
  };
  const handleDelete = (index) => {
    setJobs((prev) => {
      const newJobs = prev.filter((item, id) => id !== index);
      localStorage.setItem("jobs", JSON.stringify(newJobs));
      return newJobs;
    });
  };
  const handleChange = () => {
    setJobs((prevJob) => {
      if (job.length > 0) {
        prevJob[id].name = job;
        prevJob[id].status = status;
        localStorage.setItem("jobs", JSON.stringify(prevJob));
        return prevJob;
      }
    });
    setIsEdit(false);
    toast.success("Task Updated Successfully");
    setJob("");
    inputRef.current.focus();
  };
  const handleEdit = (id) => {
    setJob(jobs[id].name);
    setStatus(jobs[id].status);
    setIsEdit(true);
    setID(id);
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
          {optionStatus.map((item, index) => (
            <option value={item.id} key={index}>
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
          : jobs.map((job, index) => {
              return (
                <TodoItem
                  key={job.id}
                  jobitem={job}
                  job={job.name}
                  onDeleteJob={() => handleDelete(index)}
                  onEditJob={() => handleEdit(index)}
                />
              );
            })}
      </div>
    </>
  );
}

export default App;
