const btnLogout = document.getElementById("btn-logout");
const users = localStorage.getItem("user-login");

btnLogout.addEventListener("click", () => {
  if (users) {
    localStorage.removeItem("user-login");
  }
  window.location = "index.html";
});
