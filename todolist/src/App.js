import { useRef, useState } from "react";
import "./App.css";
import Todo from "./Components/TodoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const inputRef = useRef();
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs")) || job;
    return storageJobs;
  });
  // const [jobs, setJobs] = useState([]);

  const [id, setID] = useState();
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("incomplete");
  const optionStatus = [
    {
      id: 1,
      title: "incomplete",
    },
    {
      id: 2,
      title: "completed",
    },
  ];

  const handleAdd = () => {
    if (!job) {
      toast.error("Missing title Todo!");
      inputRef.current.focus();
    } else {
      // const jobitem = {
      //   name: job,
      //   status: status,
      // };
      setJobs((prev) => {
        const newJobs = [job, ...prev];
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
        prevJob[id] = job;
        localStorage.setItem("jobs", JSON.stringify(prevJob));
        return prevJob;
      }
    });
    setEdit(false);
    toast.success("Task Updated Successfully");
    setJob("");
    inputRef.current.focus();
  };
  const handleEdit = (id) => {
    setJob(jobs[id]);
    setEdit(true);
    setID(id);
    inputRef.current.focus();
  };
  const handleAddStatus = (e) => {
    setStatus(e.target.value);
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
            (e.keyCode === 13 && !edit && handleAdd()) ||
            (e.keyCode === 13 && edit && handleChange())
          }
        />
        {edit ? (
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

      {jobs.length === 0
        ? "There are no jobs on the to-do list"
        : jobs.map((job, index) => {
            return (
              <Todo
                key={index}
                job={job}
                onDeleteJob={() => handleDelete(index)}
                onEditJob={() => handleEdit(index)}
                // onCheckStatus={() => handleCheckStatus(index)}
              />
            );
          })}
    </>
  );
}

export default App;
