const API = "http://localhost:8000/todos";

const list = document.querySelector(".todo-body");
const addForm = document.querySelector("#add-form");
const addInput = document.querySelector("#add-input");

const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector("#close-modal");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");

getTodos();

async function getTodos() {
  const res = await fetch(API);
  const data = await res.json();
  console.log(data);
  render(data);
}

async function addTodo(todo) {
  // function declaration hoisting учитывать
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // нужно стянуть актуальные данные
  getTodos();
}

async function deleteTodo(id) {
  await fetch(`${API}/${id}`, {
    // `` для удаления по айди
    method: "DELETE",
  });
  getTodos();
}

async function getOneTodo(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json(); // ? обьяснить
  return data;
}

async function editTodo(id, editedTodo) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getTodos();
}

function render(arr) {
  list.innerHTML = ""; // без этого при добавлении будет добавлять по два
  arr.forEach((item) => {
    list.innerHTML += `
        <div class="todo-item">
          <div id="${item.id}" class="todo-text">${item.title}</div>
          <div class="btns">
            <button id="${item.id}" class="todo-edit">edit</button>
            <button id="${item.id}" class="todo-delete">Delete</button>
          </div>
        </div>
        `;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!addInput.value.trim()) return;
  const todo = {
    title: addInput.value,
  };
  addTodo(todo);

  addInput.value = "";
});

document.addEventListener("click", (e) => {
  // динамически созданный элемент, изначально его нет в js
  if (e.target.classList.contains("todo-delete")) {
    // target - элемент на котором происходит событие
    deleteTodo(e.target.id);
  }
});

let id = null;
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("todo-edit")) {
    modal.style.visibility = "visible";
    id = e.target.id;
    const todo = await getOneTodo(e.target.id); // getOneTodo асинхронная поэтому прилетает promise
    console.log(todo);
    editInput.value = todo.title;
    editInput.focus();
  }
});

closeModalBtn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
});

// defoltное поведение form, перезагрузка страницы из-за чего едит текст не меняется

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!editInput.value.trim()) return;

  const editedTodo = {
    title: editInput.value,
  };

  editTodo(id, editedTodo);
  modal.style.visibility = "hidden";
});

console.log('some changes')

// contact book через db json
// addInputName 
// const todo = { name:addInputName.value number:addInputPhone }

// git init
// git remote remove origin
// git remote origin (link)
// git add .
// git remote add origin (link)
// git push origin master
// 
