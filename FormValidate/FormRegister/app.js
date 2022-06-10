/* Convert Form sign-up , sign-in */
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

/* Validate Form */
let fullName = document.getElementById("nameInput");
let email = document.getElementById("emailInput");
let password = document.getElementById("passInput");
let passwordConfirm = document.getElementById("confirmInput");
let btnSubmitSignup = document.getElementById("disableBtn");
let btnSubmitSignin = document.getElementById("disableSignin");
let emailSignin = document.getElementById("emailSignin");
let passSignin = document.getElementById("passSignin");
let eyePassword = document.getElementById("eyePassword");

const regexFullName =
  /^(?=.*\D)(?=.*[^@$!%*?&])[\D]*[^@$!%`1*?&]*[\D]*[^~!@##$%^&*()0-9]+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

let listRegexInput = [
  {
    id: "name",
    index: 0,
    input: fullName,
    rule: [
      {
        regex: regexFullName,
        message: "Vui lòng nhập lại tên người dùng",
      },
    ],
    required: "Tên không được để trống",
    platform: "signup",
  },
  {
    id: "email",
    index: 1,
    input: email,
    rule: [
      {
        regex: regexEmail,
        message: "Email không hợp lệ",
      },
    ],
    required: "Email không được để trống",
    platform: "signup",
  },
  {
    id: "passowrd",
    index: 2,
    input: password,
    rule: [
      {
        regex: regexPassword,
        message: "Password không hợp lệ",
      },
    ],
    required: "Password không được để trống",
    platform: "signup",
  },
  {
    id: "confirm",
    index: 3,
    input: passwordConfirm,
    message: "Mật khẩu không khớp",
    required: "Confirm password không được để trống",
    platform: "signup",
  },
  {
    id: "emailSignin",
    index: 4,
    input: emailSignin,
    rule: [
      {
        regex: regexEmail,
        message: "Email không hợp lệ",
      },
    ],
    required: "Email không được để trống",
    platform: "signin",
  },
  {
    id: "passSignin",
    index: 5,
    input: passSignin,
    rule: [
      {
        regex: regexPassword,
        message: "Password không hợp lệ",
      },
    ],
    required: "Password không được để trống",
    platform: "signin",
  },
];

function validateOnchange(i) {
  const inputForm = document.getElementsByClassName("form-column-input");
  const messageError = document.getElementsByClassName("input-item__error");

  listRegexInput[i].input.addEventListener("input", (e) => {
    const value = listRegexInput[i].input.value.trim();
    if (value.length == 0) {
      inputForm[i].classList.add("input-item-border__error");
      messageError[i].innerText = listRegexInput[i].required;
    } else {
      if (listRegexInput[i].rule) {
        for (let j = 0; j < listRegexInput[i].rule.length; j++) {
          let formatCheck = listRegexInput[i].rule[j].regex.test(value);
          if (!formatCheck) {
            inputForm[i].classList.add("input-item-border__error");
            messageError[i].innerText = listRegexInput[i].rule[j].message;
          } else {
            inputForm[i].classList.remove("input-item-border__error");
            messageError[i].innerText = "";
          }
        }
      }
      if (listRegexInput[i].id === "confirm") {
        checkPassword(i);
      }
    }
  });
}
function setSuccessFor(isSignin) {
  const inputForm = document.getElementsByClassName("form-column-input");
  const messageError = document.getElementsByClassName("input-item__error");

  let checkSignin = true;
  let checkSignup = true;
  // listRegexInput.forEach((item, index) => {
  //   if (item.platform === "signup") {
  //     if (!item.input.value.trim()) {
  //       inputForm[index].classList.add("input-item-border__error");
  //       messageError[index].innerText = item.required;
  //       checkSignup = false;
  //     }
  //   }
  //   if (item.platform === "signin") {
  //     if (!item.input.value.trim()) {
  //       inputForm[index].classList.add("input-item-border__error");
  //       messageError[index].innerText = item.required;
  //       checkSignin = false;
  //     }
  //   }
  // });

  let listForm = [];
  if (isSignin) {
    listForm = listRegexInput.filter((item) => item.platform === "signin");
  } else {
    listForm = listRegexInput.filter((item) => item.platform === "signup");
  }
  listForm.forEach((item) => {
    if (!item.input.value.trim()) {
      inputForm[item.index].classList.add("input-item-border__error");
      messageError[item.index].innerText = item.required;
      if (isSignin) {
        checkSignin = false;
      } else {
        checkSignup = false;
      }
    }
  });

  if (!isSignin && checkSignup) {
    alert("Đăng ký thành công");
    listRegexInput.forEach((item) => {
      item.input.value = "";
    });
  }
  if (isSignin && checkSignin) {
    alert("Đăng nhập thành công");
    listRegexInput.forEach((item) => {
      item.input.value = "";
    });
  }
}

function checkPassword(i) {
  const inputForm = document.getElementsByClassName("form-column-input");
  const messageError = document.getElementsByClassName("input-item__error");

  if (passwordConfirm.value.trim() !== password.value.trim()) {
    inputForm[i].classList.add("input-item-border__error");
    messageError[i].innerText = listRegexInput[i].message;
  } else {
    inputForm[i].classList.remove("input-item-border__error");
    messageError[i].innerText = "";
  }
}

eyePassword.addEventListener("click", () => {
  passSignin.type = passSignin.type === "password" ? "text" : "password";
});

function formSubmit() {
  btnSubmitSignup.addEventListener("click", (e) => {
    e.preventDefault();
    setSuccessFor(false);
  });

  btnSubmitSignin.addEventListener("click", (e) => {
    e.preventDefault();
    setSuccessFor(true);
  });

  for (let i = 0; i < listRegexInput.length; i++) {
    validateOnchange(i);
  }
}
formSubmit();
