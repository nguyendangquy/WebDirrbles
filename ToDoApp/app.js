const jobsApi = "http://localhost:3000/jobs";
const addBtnJob = document.getElementById("addBtnJob");
const listJobsBlock = document.getElementById("list-job");
const editBtnJob = document.querySelector("#editBtnJob");
const list = document.querySelector("ul");
const todolist = document.querySelector(".todo-list");
const nameInput = document.querySelector("#myInput");

let currentJob = null;
fetchData();
handleCreateJob();

editBtnJob.addEventListener("click", () => {
  const formData = {
    name: nameInput.value,
  };
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  fetch(`${jobsApi}/${currentJob.id}`, option)
    .then((response) => response.json())
    .then(function () {
      fetchData();
      nameInput.value = "";
      addBtnJob.style.display = "block";
      editBtnJob.style.display = "none";
    })
    .catch((err) => console.log(err));
});

function fetchData() {
  let data = [];
  fetch(jobsApi)
    .then(async (response) => {
      data = await response.json();
      todolist.innerHTML = "";
      const htmls = data.map(function (job) {
        return `
        <div class = "todo-job">
        <div id ="status-${
          job.id
        }" class = "name-status ${job.status ? "checked" : ""}">
          <span class = "nameItem-${job.id}">${job.name}</span>
        </div>
        <div class = "icon-job">
        <i class="fa-solid fa-xmark close" id = "delete-${job.id}"></i>
        <i class="fa-solid fa-pen-to-square edit" id = "edit-${job.id}"></i>
        </div>
        </div>
          `;
      });
      listJobsBlock.innerHTML = htmls.join("");
      if (!data.length) {
        todolist.innerHTML = "Không có công việc nào trong danh sách";
        return;
      } else {
        data.forEach((item) => {
          document
            .getElementById(`status-${item.id}`)
            .addEventListener("click", () => {
              handleUpdateStatus(item);
            });

          document
            .getElementById(`delete-${item.id}`)
            .addEventListener("click", () => {
              handleDeleteJob(item);
            });

          document
            .getElementById(`edit-${item.id}`)
            .addEventListener("click", () => {
              handleEditJob(item);
            });
        });
      }
    })
    .catch((err) => console.log(err));
}

function handleCreateJob() {
  addBtnJob.addEventListener("click", () => {
    const inputValue = document.querySelector("#myInput").value;
    addBtnJob.disabled = true;
    addBtnJob.classList.add("disabled");
    const formData = {
      name: inputValue,
      status: false,
    };

    if (inputValue === "") {
      alert("Tiêu đề không được đề trống");
    } else {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      fetch(jobsApi, option)
        .then(function () {
          fetchData();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          addBtnJob.disabled = false;
          addBtnJob.classList.remove("disabled");
        });
    }
    document.querySelector("#myInput").value = "";
  });
}

function handleDeleteJob(item) {
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${jobsApi}/${item.id}`, option)
    .then((response) => response.json())
    .then(() => {
      fetchData();
    });
}

function handleEditJob(item) {
  nameInput.value = item.name;
  nameInput.focus();
  addBtnJob.style.display = "none";
  editBtnJob.style.display = "block";
  currentJob = item;
}

function handleUpdateStatus(item) {
  const formData = {
    name: item.name,
    status: !item.status,
  };
  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch(`${jobsApi}/${item.id}`, option)
    .then((response) => response.json())
    .then(() => {
      fetchData();
    })
    .catch((err) => console.log(err));
}
