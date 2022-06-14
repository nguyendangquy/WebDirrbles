const btnLogout = document.getElementById("btn-logout");
const users = localStorage.getItem("user-login");
const linkLogin = document.getElementById("link-login");

if (!users) {
  alert("Bạn cần đăng nhập để truy cập trang home");
  window.location = "file:///F:/FormValidate/index.html";
} else {
  console.log("success");
}
btnLogout.addEventListener("click", () => {
  console.log("logout");
  localStorage.removeItem("user-login");
  window.location = "file:///F:/FormValidate/index.html";
});
