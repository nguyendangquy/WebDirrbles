const btnLogout = document.getElementById("btn-logout");
const users = localStorage.getItem("user-login");

btnLogout.addEventListener("click", () => {
  console.log("logout");
  if (users) {
    localStorage.removeItem("user-login");
  }
  window.location = "file:///F:/FormValidate/index.html";
});
