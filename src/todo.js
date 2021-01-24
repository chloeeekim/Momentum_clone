const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== li.id;
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function toggleChecked(event) {
  const checked = event.target.checked,
    toDoId = event.target.parentNode.id;  
  const filteredToDo = toDos.filter(function(toDo) {
    if (toDo.id === toDoId) {
      toDo.done = !toDo.done;
    }
    return toDo;
  });
  toDos = filteredToDo;
  saveToDos();
}
 
function paintToDo(toDo) {
  const li = document.createElement("li"),
   checkbox = document.createElement("input"),
   span = document.createElement("span"),
   delBtn = document.createElement("button");

  li.className = "toDo";
  li.id = toDo.id;
  
  checkbox.className = "toDoCheckbox";
  checkbox.type = "checkbox";
  checkbox.checked = toDo.done;
  checkbox.addEventListener("click", toggleChecked);
  
  span.className = "toDoText";
  span.innerText = toDo.text;

  delBtn.className = "delToDoBtn";
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  const toDoObj = {
    id: String(new Date().getTime()),
    text: currentValue,
    done: false
  };
  paintToDo(toDoObj);
  toDos.push(toDoObj);
  saveToDos();
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    toDos = JSON.parse(loadedToDos);
    toDos.forEach(function(toDo) {
      paintToDo(toDo);
    })
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();