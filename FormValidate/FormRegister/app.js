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
const fullName = document.getElementById("nameInput");
const email = document.getElementById("emailInput");
const password = document.getElementById("passInput");
const passwordConfirm = document.getElementById("confirmInput");
const btnSubmitSignup = document.getElementById("disableBtn");
const btnSubmitSignin = document.getElementById("disableSignin");
const emailSignin = document.getElementById("emailSignin");
const passSignin = document.getElementById("passSignin");
const eyePassword = document.getElementById("eyePassword");

const regexFullName =
  /^(?=.*\D)(?=.*[^@$!%*?&])[\D]*[^@$!%`1*?&]*[\D]*[^~!@##$%^&*()0-9]+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const listRegexInput = [
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

var inputsForm = document.getElementsByClassName("form-column-input");
var messagesError = document.getElementsByClassName("input-item__error");
const validateOnchange = (index) => {
  listRegexInput[index].input.addEventListener("input", (e) => {
    const value = listRegexInput[index].input.value.trim();
    if (value.length == 0) {
      inputsForm[index].classList.add("input-item-border__error");
      messagesError[index].innerText = listRegexInput[index].required;
    } else if (listRegexInput[index].rule) {
      for (let j = 0; j < listRegexInput[index].rule.length; j++) {
        let formatCheck = listRegexInput[index].rule[j].regex.test(value);
        if (!formatCheck) {
          inputsForm[index].classList.add("input-item-border__error");
          messagesError[index].innerText =
            listRegexInput[index].rule[j].message;
        } else {
          inputsForm[index].classList.remove("input-item-border__error");
          messagesError[index].innerText = "";
        }
      }
    }
    if (listRegexInput[index].id === "confirm") {
      checkPassword(index);
    }
  });
};
const setSuccessFor = (isSignin) => {
  let listForm = [];
  if (isSignin) {
    listForm = listRegexInput.filter((item) => item.platform === "signin");
  } else {
    listForm = listRegexInput.filter((item) => item.platform === "signup");
  }
  listForm.forEach((item) => {
    if (!item.input.value.trim()) {
      inputsForm[item.index].classList.add("input-item-border__error");
      messagesError[item.index].innerText = item.required;
    }
  });

  if (isSignin) {
    successForSignin();
  } else {
    successForSignup();
  }
};
const successForSignup = () => {
  let check = true;
  const listForm = listRegexInput.filter((item) => item.platform === "signup");
  listForm.forEach((item) => {
    if (messagesError[item.index].innerText) {
      check = false;
    }
  });
  if (check) {
    alert("Đăng ký thành công");
    listForm.forEach((item) => {
      item.input.value = "";
    });
  }
};
const successForSignin = () => {
  let check = true;
  const listForm = listRegexInput.filter((item) => item.platform === "signin");
  listForm.forEach((item) => {
    if (messagesError[item.index].innerText) {
      check = false;
    }
  });
  if (check) {
    alert("Đăng nhập thành công");
    listForm.forEach((item) => {
      item.input.value = "";
    });
  }
};

const checkPassword = (index) => {
  if (passwordConfirm.value !== password.value) {
    inputsForm[index].classList.add("input-item-border__error");
    messagesError[index].innerText = listRegexInput[index].message;
  } else {
    inputsForm[index].classList.remove("input-item-border__error");
    messagesError[index].innerText = "";
  }
};

eyePassword.addEventListener("click", () => {
  passSignin.type = passSignin.type === "password" ? "text" : "password";
});

const formSubmit = () => {
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
};
formSubmit();
