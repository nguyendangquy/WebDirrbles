const btnLogout = document.getElementById("btn-logout");
const users = localStorage.getItem("user-login");
const linkLogin = document.getElementById("link-login");

if (!users) {
  window.location = "index.html";
} else {
  console.log("success");
}
btnLogout.addEventListener("click", () => {
  console.log("logout");
  localStorage.removeItem("user-login");
  window.location = "index.html";
});