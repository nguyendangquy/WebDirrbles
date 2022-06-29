const jobsApi = "http://localhost:3000/jobs";
const addBtnJob = document.getElementById("addBtnJob");
const listJobsBlock = document.getElementById("list-job");
const editBtnJob = document.querySelector("#editBtnJob");
const list = document.querySelector("ul");
const todolist = document.querySelector(".todo-list");
const nameInput = document.querySelector("#myInput");

let currentJob = null;
initData();
handleCreateJob();

editBtnJob.addEventListener("click", () => {
  const dataForm = {
    name: nameInput.value,
  };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  };
  fetch(jobsApi + "/" + currentJob.id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      initData();
      nameInput.value = "";
      addBtnJob.style.display = "block";
      editBtnJob.style.display = "none";
    })
    .catch(function (err) {
      console.log(err);
    });
});

function initData() {
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
      if (data.length == 0) {
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
    .catch(function (err) {
      console.log(err);
    });
}

function handleCreateJob() {
  addBtnJob.addEventListener("click", () => {
    const valueInput = document.querySelector("#myInput").value;
    const dataForm = {
      name: valueInput,
      status: false,
    };
    if (valueInput === "") {
      alert("Tiêu đề không được đề trống");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      };
      fetch(jobsApi, options).then(function () {
        initData();
      });
    }
    document.querySelector("#myInput").value = "";
  });
}

function handleDeleteJob(item) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(jobsApi + "/" + item.id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      initData();
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
  let dataForm = {
    name: item.name,
    status: !item.status,
  };
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForm),
  };

  fetch(jobsApi + "/" + item.id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      initData();
    })
    .catch(function (err) {
      console.log(err);
    });
}
