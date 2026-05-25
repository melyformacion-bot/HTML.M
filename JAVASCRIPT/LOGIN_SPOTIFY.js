const demoUser = {
  name: "Demo",
  email: "demo@music.com",
  password: "Demo1234"
};

const authSection = document.querySelector("#authSection");
const welcomeSection = document.querySelector("#welcomeSection");
const showLogin = document.querySelector("#showLogin");
const showRegister = document.querySelector("#showRegister");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const rememberUser = document.querySelector("#rememberUser");
const loginEmailError = document.querySelector("#loginEmailError");
const loginPasswordError = document.querySelector("#loginPasswordError");
const loginMessage = document.querySelector("#loginMessage");

const registerName = document.querySelector("#registerName");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const registerNameError = document.querySelector("#registerNameError");
const registerEmailError = document.querySelector("#registerEmailError");
const registerPasswordError = document.querySelector("#registerPasswordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");
const registerMessage = document.querySelector("#registerMessage");

const welcomeName = document.querySelector("#welcomeName");
const welcomeEmail = document.querySelector("#welcomeEmail");
const logoutButton = document.querySelector("#logoutButton");

const rememberedEmail = localStorage.getItem("musicLoginRemember");

if (rememberedEmail) {
  loginEmail.value = rememberedEmail;
  rememberUser.checked = true;
}

function getUsers() {
  const users = JSON.parse(localStorage.getItem("musicLoginUsers")) || [];
  const hasDemoUser = users.some((user) => user.email === demoUser.email);

  return hasDemoUser ? users : [demoUser, ...users];
}

function saveUsers(users) {
  const customUsers = users.filter((user) => user.email !== demoUser.email);
  localStorage.setItem("musicLoginUsers", JSON.stringify(customUsers));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function changeForm(formName) {
  const isLogin = formName === "login";

  showLogin.classList.toggle("active", isLogin);
  showRegister.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("active", isLogin);
  registerForm.classList.toggle("active", !isLogin);
  clearLogin();
  clearRegister();
}

function clearLogin() {
  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";
  loginMessage.textContent = "";
  loginMessage.classList.remove("success");
}

function clearRegister() {
  registerNameError.textContent = "";
  registerEmailError.textContent = "";
  registerPasswordError.textContent = "";
  confirmPasswordError.textContent = "";
  registerMessage.textContent = "";
  registerMessage.classList.remove("success");
}

function validateLogin() {
  let isValid = true;
  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();

  clearLogin();

  if (!email) {
    loginEmailError.textContent = "Escribe tu correo.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    loginEmailError.textContent = "Correo no valido.";
    isValid = false;
  }

  if (!password) {
    loginPasswordError.textContent = "Escribe tu contrasena.";
    isValid = false;
  }

  return isValid;
}

function validateRegister() {
  let isValid = true;
  const name = registerName.value.trim();
  const email = registerEmail.value.trim().toLowerCase();
  const password = registerPassword.value.trim();
  const confirm = confirmPassword.value.trim();

  clearRegister();

  if (name.length < 2) {
    registerNameError.textContent = "Escribe minimo 2 letras.";
    isValid = false;
  }

  if (!email) {
    registerEmailError.textContent = "Escribe tu correo.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    registerEmailError.textContent = "Correo no valido.";
    isValid = false;
  } else if (getUsers().some((user) => user.email === email)) {
    registerEmailError.textContent = "Este correo ya existe.";
    isValid = false;
  }

  if (password.length < 8) {
    registerPasswordError.textContent = "Minimo 8 caracteres.";
    isValid = false;
  }

  if (!confirm) {
    confirmPasswordError.textContent = "Repite la contrasena.";
    isValid = false;
  } else if (password !== confirm) {
    confirmPasswordError.textContent = "Las contrasenas no coinciden.";
    isValid = false;
  }

  return isValid;
}

function goToLinkedPage() {
  window.location.href = "TRABAJO_NETFLIX.html";
  const url = "TRABAJO_NETFLIX.html";

setTimeout(() => {
    window.location.href = url;
}, 35);
}

showLogin.addEventListener("click", () => changeForm("login"));
showRegister.addEventListener("click", () => changeForm("register"));

document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector(`#${button.dataset.input}`);
    const shouldShow = input.type === "password";

    input.type = shouldShow ? "text" : "password";
    button.textContent = shouldShow ? "Ocultar" : "Ver";
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateLogin()) {
    return;
  }

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value.trim();
  const user = getUsers().find((item) => item.email === email && item.password === password);

  if (!user) {
    loginMessage.textContent = "Correo o contrasena incorrectos.";
    return;
  }

  if (rememberUser.checked) {
    localStorage.setItem("musicLoginRemember", email);
  } else {
    localStorage.removeItem("musicLoginRemember");
  }

 goToLinkedPage();
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateRegister()) {
    return;
  }

  const users = getUsers();
  const user = {
    name: registerName.value.trim(),
    email: registerEmail.value.trim().toLowerCase(),
    password: registerPassword.value.trim()
  };

  users.push(user);
  saveUsers(users);

  registerMessage.textContent = "Usuario creado. Ya puedes entrar.";
  registerMessage.classList.add("success");
  loginEmail.value = user.email;
  registerForm.reset();

  window.setTimeout(() => changeForm("login"), 700);
});

[loginEmail, loginPassword].forEach((input) => {
  input.addEventListener("input", clearLogin);
});

[registerName, registerEmail, registerPassword, confirmPassword].forEach((input) => {
  input.addEventListener("input", clearRegister);
});

logoutButton.addEventListener("click", () => {
  welcomeSection.hidden = true;
  authSection.hidden = false;
  loginPassword.value = "";
  clearLogin();
  changeForm("login");
});