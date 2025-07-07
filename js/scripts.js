//Seleção de elementos
const todoform = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

//Funções

// Uso da biblioteca Toastify para exibir mensagens de notificação, seguindo as cores do projeto
const showToast = (message, type = "success") => {
  const colors = {
    success: "#1cb641",
    info: "#b837d6",
    error: "#d32f2f",
  };

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: colors[type],
      borderRadius: "7px",
    },
  }).showToast();
};

//Função que cria e adiciona as tarefas digitadas pelo usuario
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="ph ph-checks"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="ph ph-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="ph ph-x"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();

  // chama a função de toast na hora certa
  showToast("Tarefa adicionada com sucesso!", "success");
};

//Função que esconde editForm, todoForm, todoList com CSS.
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoform.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

//Função que trata o input de edição da tarefa.
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");
    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });

  // chama a função de toast na hora certa.
  showToast("Tarefa editada com sucesso!", "info");
};

//Função que filtra as tarefas 
const filter = () => {
  const filterValue = filterSelect.value;
  const tasks = document.querySelectorAll(".todo");

  tasks.forEach((task) => {
    if (filterValue === "done") {
      if (task.classList.contains("done")) {
        task.classList.remove("hide-task");
      } else {
        task.classList.add("hide-task");
      }
    }
    if (filterValue === "all") {
      task.classList.remove("hide-task");
    }
    if (filterValue === "todo") {
      if (!task.classList.contains("done")) {
        task.classList.remove("hide-task");
      } else {
        task.classList.add("hide-task");
      }
    }
  });
};

//Função que pesquisa todas as tarefas.
const pesquisar = () => {
  const searchValue = searchInput.value;
  const todasTarefas = document.querySelectorAll(".todo");

  todasTarefas.forEach((todas) => {
    let title = todas.querySelector("h3");
    if (
      title.innerText
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    ) {
      todas.classList.remove("hide-task");
    } else {
      todas.classList.add("hide-task");
    }
  });
};

//Eventos

//Dispara o evento de criação de tarefas.
todoform.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

//Dispara o evento de filtragem das tarefas
filterSelect.addEventListener("change", () => {
  filter();
});

//Dispara o evento dos botoes de cada tarefa.
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    const isDone = parentEl.classList.contains("done");
    // chama a função de toast na hora certa.
    showToast(isDone ? "Tarefa concluída!" : "Tarefa reaberta!", "success");
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
    // chama a função de toast na hora certa.
    showToast("Tarefa removida!", "error");
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

//Evento do botão de cancelar edição.
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

//Evento que pega o input de edição do usuario e trata com as funções updateTodo() e toggleForms()
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

//Evento de pesquisa.
searchInput.addEventListener("input", (e) => {
  pesquisar();
});

//Dispara o evento que apaga o texto e pesquisa novamente, mostrando todas as tarefas.
eraseButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  pesquisar();
});
