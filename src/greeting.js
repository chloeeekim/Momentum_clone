const formName = document.querySelector(".js-askName"),
  inputName = formName.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  formName.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  toDoForm.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello, ${text}!`;
}

function handleSubmit(event) {
  console.log(event);
  event.preventDefault();
  const currentValue = inputName.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  formName.classList.add(SHOWING_CN);
  formName.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();